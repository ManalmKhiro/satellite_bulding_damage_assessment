import os
import json
from datetime import datetime

# المسار الذي ستُحفظ فيه الملفات
MAPS_FOLDER = os.path.join(os.path.dirname(__file__), "..", "maps")

# إنشاء المجلد إذا لم يكن موجوداً
os.makedirs(MAPS_FOLDER, exist_ok=True)


def save_analysis(result):
    """
    حفظ نتيجة تحليل واحدة كملف JSON
    """

    filename = datetime.now().strftime("%Y%m%d_%H%M%S") + ".json"

    filepath = os.path.join(MAPS_FOLDER, filename)

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=4, ensure_ascii=False)


def load_all_analyses():
    """
    قراءة جميع نتائج التحليل
    """

    analyses = []

    for file in os.listdir(MAPS_FOLDER):

        if file.endswith(".json"):

            filepath = os.path.join(MAPS_FOLDER, file)

            with open(filepath, "r", encoding="utf-8") as f:
                analyses.append(json.load(f))

    return analyses

