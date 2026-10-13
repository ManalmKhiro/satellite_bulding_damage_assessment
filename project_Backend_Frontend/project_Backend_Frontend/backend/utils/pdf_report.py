from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet


def generate_report(result):

    filename = "damage_report.pdf"

    doc = SimpleDocTemplate(
        filename
    )

    styles = getSampleStyleSheet()

    elements = []

    # =========================
    # TITLE
    # =========================
    elements.append(
        Paragraph(
            "<b>DAMAGE AI REPORT</b>",
            styles["Title"]
        )
    )

    elements.append(
        Spacer(1,20)
    )

    # =========================
    # SINGLE MODE
    # =========================
    if result["mode"] == "single":

        elements.append(
            Paragraph(
                "<b>Single Building Analysis</b>",
                styles["Heading2"]
            )
        )

        elements.append(
            Spacer(1,10)
        )

        elements.append(
            Paragraph(
                f"Class: {result['class']}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Damage: {result['damage_percent']}%",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Confidence: "
                f"{result['confidence']*100:.2f}%",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Model: "
                f"{result.get('model','CNN')}",
                styles["Normal"]
            )
        )

        doc.build(elements)

        return filename

    # =========================
    # AREA MODE
    # =========================
    statistics = result["statistics"]

    elements.append(
        Paragraph(
            "<b>Area Analysis</b>",
            styles["Heading2"]
        )
    )

    elements.append(
        Spacer(1,10)
    )

    elements.append(
        Paragraph(
            f"Total Buildings: "
            f"{statistics['total_buildings']}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Destroyed: "
            f"{statistics['destroyed']}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Damaged: "
            f"{statistics['damaged']}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Safe: "
            f"{statistics['safe']}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Estimated Population: "
            f"{statistics['estimated_population']}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Affected Population: "
            f"{statistics['affected_population']}",
            styles["Normal"]
        )
    )

    elements.append(
        Spacer(1,20)
    )

    data = [[
        "ID",
        "Class",
        "Damage %",
        "Population",
        "Confidence"
    ]]

    for b in result["buildings"]:

        data.append([

            b["id"],

            b["class"],

            f"{b.get('damage_percent',0)}%",

            b["population"],

            f"{b['confidence']*100:.1f}%"

        ])

    table = Table(data)

    table.setStyle(

        TableStyle([

            ("BACKGROUND",
             (0,0),
             (-1,0),
             colors.grey),

            ("TEXTCOLOR",
             (0,0),
             (-1,0),
             colors.white),

            ("GRID",
             (0,0),
             (-1,-1),
             1,
             colors.black),

            ("FONTNAME",
             (0,0),
             (-1,0),
             "Helvetica-Bold"),

            ("ALIGN",
             (0,0),
             (-1,-1),
             "CENTER")

        ])
    )

    elements.append(
        table
    )

    doc.build(
        elements
    )

    return filename