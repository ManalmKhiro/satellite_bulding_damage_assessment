def estimate_population(width,height):

    """
    area estimation
    """

    area = width * height


    density_factor = 0.05

    population = max(1,round(area*density_factor))


    return {

        "area":round(area,2),

        "population":population

    }


def affected_population(buildings):

    total=0

    affected=0

    safe=0


    for b in buildings:

        total+=b["population"]

        if b["class"]=="destroyed":

            affected+=b["population"]

        elif b["class"]=="damaged":

            affected+=round(b["population"]*0.5)

        else:

            safe+=b["population"]


    return {

        "estimated_population":total,

        "affected_population":affected,

        "safe_population":safe

    }