const UnitPostingFields = {
    unitPostingFieldsObj : {
        "Tower": {
            "BHK": {
                "fields": [
                    "totalUnits",
                    "minSize",
                    "maxSize",
                    "minPrice",
                    "maxPrice",
                    "floorPlan",
                    "images",
                    "comments"
                ]
            }
        },
        "Plotted": {
            "villas": {
                "fields": [
                    "BHK",
                    "totalUnits",
                    "minBuiltUpArea",
                    "maxBuiltUpArea",
                    "minPlotSize",
                    "maxPlotSize",
                    "minPrice",
                    "maxPrice",
                    "floorPlan",
                    "images",
                    "comments",
                ]
            },
            "plots": {
                "fields": [
                    "totalUnits",
                    "minPlotSize",
                    "maxPlotSize",
                    "minPrice",
                    "maxPrice",
                    "floorPlan",
                    "comments",
                ]
            },
            "office": {
                "fields": [
                    "type",
                    "totalUnits",
                    "minBuiltUpArea",
                    "maxBuiltUpArea",
                    "minPrice",
                    "maxPrice",
                    "floorPlan",
                    "images",
                    "comments",
                ]
            }
        }
    }
}

export default UnitPostingFields;