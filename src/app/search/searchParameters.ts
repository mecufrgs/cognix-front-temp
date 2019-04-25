export const parameters = {
    name:"área de conhecimento",
    next: [

        {
            name:"linguagens"
        },
        {
            name:"matemática"
        },
        {
            name:"ciências da natureza",
            next: [
                {
                    name:"primeiro ano",
                    next: [
                        {
                            name:"matéria e energia"
                        },
                        {
                            name:"vida e evolução",
                            next: [
                                {
                                    name:"corpo humano"
                                },
                                {
                                    name:"respeito a diversidade"
                                },

                            ]
                        },
                        {
                            name:"Terra e universo"
                        },
                    ]
                },
                {
                    name:"segundo ano"
                },
                {
                    name:"terceiro ano"
                },
                {
                    name:"quarto ano"
                },
                {
                    name:"quinto ano"
                },
            ]
        },
        {
            name:"ciências humanas"
        },
        {
            name:"ensino religioso"
        }

    ]



}