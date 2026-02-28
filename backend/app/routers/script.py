# app/routers/script.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.script import ChapterResponse
from app.cruds import script as crud

# ルーターの作成
router = APIRouter(
    prefix="/scripts",
    tags=["scripts"],
)


@router.get("/chapters", response_model=list[ChapterResponse])
def get_chapters(db: Session = Depends(get_db)):
    """全ての章一覧を取得する"""
    return crud.get_all_chapters(db)


@router.get("/chapters/{chapter_id}", response_model=ChapterResponse)
def get_chapter(chapter_id: int, db: Session = Depends(get_db)):
    """指定した章とセリフ一覧を取得する"""
    chapter = crud.get_chapter_with_scripts(db, chapter_id)
    # 章が見つからない場合は404を返す
    if chapter is None:
        raise HTTPException(status_code=404, detail="章が見つかりません")
    return chapter

@router.get("/scripts/{script_id}")
def get_script(script_id: int, db: Session = Depends(get_db)):
    """指定したセリフを1件取得する"""
    script = crud.get_script(db, script_id)
    if script is None:
        raise HTTPException(status_code=404, detail="セリフが見つかりません")
    return script