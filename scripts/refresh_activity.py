#!/usr/bin/env python3
"""Refresh the GitHub activity snapshot for the homepage.

Fetches public profile stats (stars / repos / followers) via the REST API and
the contribution calendar via the GraphQL API, then rewrites js/activity-data.js.

Usage:
  - Locally:   HTTPS_PROXY=http://127.0.0.1:7897 GH_TOKEN=<token> python scripts/refresh_activity.py
  - In CI:     GH_TOKEN is provided by the workflow (secrets.GITHUB_TOKEN); no proxy needed.
"""
import json
import os
import ssl
import sys
import urllib.request
from datetime import datetime, timezone

USER = "AttentionCoo"
# 主页展示的项目，星标与 Fork 数随快照一起更新
PROJECT_REPOS = ["stroke-multi-agent-cdss", "learning-characterizing-mas", "Titanic-FT-Transformer"]
OUT = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "js", "activity-data.js"))
PROXY = os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")
TOKEN = os.environ.get("GH_TOKEN", "")


def build_opener():
    ctx = ssl.create_default_context()
    try:
        ctx.load_default_certs()
    except Exception:
        ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
    handlers = [urllib.request.HTTPSHandler(context=ctx)]
    if PROXY:
        handlers.append(urllib.request.ProxyHandler({"https": PROXY, "http": PROXY}))
    return urllib.request.build_opener(*handlers)


def call(op, url, headers=None, data=None, method=None):
    h = {"User-Agent": "attentioncoo-activity-refresh"}
    if TOKEN:
        h["Authorization"] = "bearer " + TOKEN
    if headers:
        h.update(headers)
    req = urllib.request.Request(url, headers=h, data=data, method=method)
    with op.open(req, timeout=60) as r:
        return r.status, r.read()


def main():
    op = build_opener()

    # REST: profile + repos (non-fork only)
    st, body = call(op, f"https://api.github.com/users/{USER}")
    if st != 200:
        raise RuntimeError(f"GET /users/{USER} failed: {st}")
    user = json.loads(body)

    st, body = call(op, f"https://api.github.com/users/{USER}/repos?per_page=100&sort=pushed")
    if st != 200:
        raise RuntimeError(f"GET /users/{USER}/repos failed: {st}")
    repos = json.loads(body)
    own = [r for r in repos if not r.get("fork")]
    stars = sum(r.get("stargazers_count", 0) for r in own)

    # REST: per-project stars / forks for the featured projects
    project_stats = {}
    for name in PROJECT_REPOS:
        try:
            st, body = call(op, f"https://api.github.com/repos/{USER}/{name}")
            if st == 200:
                d = json.loads(body)
                project_stats[name] = {
                    "stars": d.get("stargazers_count", 0),
                    "forks": d.get("forks_count", 0),
                }
        except Exception as exc:  # 单个项目失败不阻塞整体刷新
            print(f"warn: fetch {name} failed: {exc}", file=sys.stderr)

    # GraphQL: contribution calendar
    gql = {
        "query": """
        query {
          user(login: "%s") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
        """
        % USER
    }
    st, body = call(
        op,
        "https://api.github.com/graphql",
        headers={"Content-Type": "application/json"},
        data=json.dumps(gql).encode(),
        method="POST",
    )
    if st != 200:
        raise RuntimeError(f"GraphQL failed: {st} {body[:300]!r}")
    cal = json.loads(body)["data"]["user"]["contributionsCollection"]["contributionCalendar"]

    snapshot = {
        "totalStars": stars,
        "publicRepos": user.get("public_repos", 0),
        "followers": user.get("followers", 0),
        "totalCommits": cal["totalContributions"],
        "projects": project_stats,
        "calendar": [[d["contributionCount"] for d in w["contributionDays"]] for w in cal["weeks"]],
        "firstDay": cal["weeks"][0]["contributionDays"][0]["date"],
        "fetchedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    }

    js = "window.ACTIVITY_SNAPSHOT = " + json.dumps(snapshot, ensure_ascii=False) + ";\n"
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(js)
    print(
        "snapshot updated | fetchedAt:",
        snapshot["fetchedAt"],
        "| commits:",
        snapshot["totalCommits"],
        "| stars:",
        snapshot["totalStars"],
        "| repos:",
        snapshot["publicRepos"],
        "| followers:",
        snapshot["followers"],
    )


if __name__ == "__main__":
    sys.exit(main())
