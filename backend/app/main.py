# エントリーポイント
# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models import script  # モデルをインポートしてテーブルを作成
from app.routers import script as script_router

# テーブルが存在しない場合に自動作成
Base.metadata.create_all(bind=engine)

# FastAPIアプリケーションのインスタンスを作成
app = FastAPI(
    title="Tanuki Learning API",
    description="API for Tanuki Learning platform",
    version="0.1.0"
)

# フロントエンド(React)からのリクエストを許可するためのCORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Viteのデフォルトポート
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのヘッダーを許可
)

# ルーターを登録
app.include_router(script_router.router)

# 動作確認用のルート
@app.get("/")
def read_root():
    return {"message": "Welcome to Tanuki Learning!"}
