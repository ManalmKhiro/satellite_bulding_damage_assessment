def calculate_statistics(buildings):

    destroyed = 0
    damaged = 0
    safe = 0

    confidence = 0

    total_damage = 0

    total_population = 0

    for b in buildings:

        confidence += b["confidence"]

        total_damage += b.get(
            "damage_percent",
            0
        )

        total_population += b.get(
            "population",
            0
        )

        if b["class"] == "destroyed":

            destroyed += 1

        elif b["class"] == "damaged":

            damaged += 1

        else:

            safe += 1

    total = len(buildings)

    avg_confidence = 0
    avg_damage = 0

    if total > 0:

        avg_confidence = (
            confidence / total
        )

        avg_damage = (
            total_damage / total
        )

    return {

        "total_buildings":
        total,

        "destroyed":
        destroyed,

        "damaged":
        damaged,

        "safe":
        safe,

        "average_confidence":
        round(
            avg_confidence * 100,
            2
        ),

        "average_damage":
        round(
            avg_damage,
            2
        ),

        "estimated_population":
        total_population
    }