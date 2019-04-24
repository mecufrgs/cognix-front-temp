export const parameters = {
    fields: ["linguagens", "matemática", "ciências da natureza", "ciências humanas", "ensino religioso"],
    params: [{},{},
            {
                fields: ["primeiro ano", "segundo ano", "terceiro ano", "quarto ano", "quinto ano"],  
                params: [
                    {
                        fields: ["matéria e energia", "vida e evolução", "Terra e universo"],
                        params: [{},
                            {
                                fields: ["corpo humano", "respeito a diversidade"]
                            }
                        ]
                    }
                ]
            }


    ]

}