# scripts/seed_quiz.py
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from app.database import SessionLocal
from app.cruds.script import create_quiz, create_quiz_choice, create_terminal

def seed():
    db = SessionLocal()
    try:
        # ===========================
        # Linux: ファイルシステム (chapter_id=4)
        # ===========================

        # Q1
        q1 = create_quiz(
            db,
            chapter_id=4,
            question="現在いるディレクトリのパスを表示するコマンドはどれか？",
            explanation="pwdはPrint Working Directoryの略。現在の作業ディレクトリの絶対パスを表示する。",
            order=1
        )
        create_quiz_choice(db, quiz_id=q1.id, text="pwd", is_correct=True)
        create_quiz_choice(db, quiz_id=q1.id, text="ls", is_correct=False)
        create_quiz_choice(db, quiz_id=q1.id, text="cd", is_correct=False)
        create_quiz_choice(db, quiz_id=q1.id, text="echo", is_correct=False)

        # Q2
        q2 = create_quiz(
            db,
            chapter_id=4,
            question="/etc ディレクトリには何が格納されているか？",
            explanation="/etcはシステムの設定ファイルが格納されるディレクトリ。FHSで定義されている。",
            order=2
        )
        create_quiz_choice(db, quiz_id=q2.id, text="システム設定ファイル", is_correct=True)
        create_quiz_choice(db, quiz_id=q2.id, text="ユーザーのホームディレクトリ", is_correct=False)
        create_quiz_choice(db, quiz_id=q2.id, text="一時ファイル", is_correct=False)
        create_quiz_choice(db, quiz_id=q2.id, text="カーネルファイル", is_correct=False)

        # Q3
        q3 = create_quiz(
            db,
            chapter_id=4,
            question="ルートディレクトリを表す記号はどれか？",
            explanation="Linuxのファイルシステムは/（スラッシュ）をルートとした木構造になっている。",
            order=3
        )
        create_quiz_choice(db, quiz_id=q3.id, text="/", is_correct=True)
        create_quiz_choice(db, quiz_id=q3.id, text="~", is_correct=False)
        create_quiz_choice(db, quiz_id=q3.id, text=".", is_correct=False)
        create_quiz_choice(db, quiz_id=q3.id, text="..", is_correct=False)

        # Q4
        q4 = create_quiz(
            db,
            chapter_id=4,
            question="ホームディレクトリを表す記号はどれか？",
            explanation="~はホームディレクトリの省略表記。cd ~でホームに戻れる。",
            order=4
        )
        create_quiz_choice(db, quiz_id=q4.id, text="~", is_correct=True)
        create_quiz_choice(db, quiz_id=q4.id, text="/", is_correct=False)
        create_quiz_choice(db, quiz_id=q4.id, text=".", is_correct=False)
        create_quiz_choice(db, quiz_id=q4.id, text="*", is_correct=False)

        # Q5
        q5 = create_quiz(
            db,
            chapter_id=4,
            question="一時ファイルが格納されるディレクトリはどれか？",
            explanation="/tmpは再起動時に削除される一時ファイル置き場。誰でも読み書きできる。",
            order=5
        )
        create_quiz_choice(db, quiz_id=q5.id, text="/tmp", is_correct=True)
        create_quiz_choice(db, quiz_id=q5.id, text="/var", is_correct=False)
        create_quiz_choice(db, quiz_id=q5.id, text="/usr", is_correct=False)
        create_quiz_choice(db, quiz_id=q5.id, text="/opt", is_correct=False)

        # ===========================
        # Terminal問題
        # ===========================

        create_terminal(
            db,
            chapter_id=4,
            description="ホームディレクトリに移動するコマンドを入力してください",
            command_template="___",
            answer="cd ~",
            hint="cdコマンドと~を組み合わせる",
            explanation="cd ~でホームディレクトリに移動できる。cdだけでも同じ効果がある。",
            order=1
        )

        create_terminal(
            db,
            chapter_id=4,
            description="現在のディレクトリのファイルを詳細表示するコマンドを入力してください",
            command_template="___",
            answer="ls -l",
            hint="lsコマンドに詳細表示のオプションをつける",
            explanation="ls -lで権限・所有者・サイズ・日時などの詳細情報が表示される。",
            order=2
        )

        create_terminal(
            db,
            chapter_id=4,
            description="/var/logディレクトリに移動するコマンドを入力してください",
            command_template="cd ___",
            answer="cd /var/log",
            hint="絶対パスで指定する",
            explanation="/var/logはシステムのログファイルが格納されるディレクトリ。",
            order=3
        )

        create_terminal(
            db,
            chapter_id=4,
            description="隠しファイルを含む全ファイルを表示するコマンドを入力してください",
            command_template="___",
            answer="ls -a",
            hint="lsコマンドにallのオプションをつける",
            explanation="ls -aで.から始まる隠しファイルも含めて全ファイルが表示される。",
            order=4
        )

        create_terminal(
            db,
            chapter_id=4,
            description="現在のディレクトリのパスを表示するコマンドを入力してください",
            command_template="___",
            answer="pwd",
            hint="Print Working Directoryの略",
            explanation="pwdで現在作業しているディレクトリの絶対パスが表示される。",
            order=5
        )

        print("✅ Quiz・Terminalシードデータの投入が完了しました！")

    except Exception as e:
        db.rollback()
        print(f"❌ エラー: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed()