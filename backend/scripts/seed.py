# scripts/seed.py
# JSONファイルを読み込んでDBに投入するスクリプト
import json
import sys
from pathlib import Path

# backendディレクトリをパスに追加
sys.path.append(str(Path(__file__).parent.parent))

from app.database import SessionLocal, engine, Base
from app.models.script import Chapter, Script

def seed_from_json(filepath: str):
    """指定したJSONファイルのデータをDBに投入する"""

    # JSONファイルを読み込む
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    db = SessionLocal()

    try:
        # 章を作成
        chapter = Chapter(
            title=data["topic"],
            description=None,
            order=0
        )
        db.add(chapter)
        db.commit()
        db.refresh(chapter)
        print(f"章を作成しました：{chapter.title}")

        # 全ページのセリフを順番に投入
        order = 0
        for page in data["pages"]:
            for line in page["lines"]:
                script = Script(
                    chapter_id=chapter.id,
                    character=line["speaker"],
                    text=line["text"],
                    order=order
                )
                db.add(script)
                order += 1

        db.commit()
        print(f"セリフを {order} 件投入しました！")

    except Exception as e:
        db.rollback()
        print(f"エラーが発生しました：{e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_from_json("content/network.json")