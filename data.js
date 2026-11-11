// --- DATOS DE PROMOCIONES --- 
const promotions = [     
    {         
        id: 'kenua-buy-and-fly',         
        categoryKey: 'kenua-departamentos',         
        categoryName: 'Kenúa Departamentos',         
        title: 'Buy and Fly - Kenúa Departamentos',         
        subtitle: 'Vuela a Yucatán y conoce tu próximo hogar.',         
        image: 'https://res.cloudinary.com/crnwqzqq/image/upload/v1794257975/Buy_and_fly_kenua_post.png',         
        benefit: 'Bonificación desde $35,000 MXN',         
        tag: 'Bonificación Directa',         
        targetDate: '2026-11-30T23:59:59',         
        highlights: [             
            'Vuelo a Yucatán incluido para conocer el desarrollo',             
            'Bonificación aplicable desde $35,000 MXN',             
            'Departamentos con ubicación privilegiada',             
            'Sujeto a disponibilidad y restricciones'         
        ],         
        terms: 'Válido del 1 al 30 de noviembre de 2026. Consulta términos y condiciones. Imágenes ilustrativas. Orve Inmobiliaria.',         
        validity: '1 - 30 Noviembre 2026'     
    },
    {         
        id: 'kenua-venta-nocturna',         
        categoryKey: 'kenua-departamentos',         
        categoryName: 'Kenúa Departamentos',         
        title: 'Venta Nocturna - Kenúa Departamentos',         
        subtitle: '¡La oportunidad que estabas esperando!',         
        image: 'https://res.cloudinary.com/crnwqzqq/image/upload/v1794257975/KENUA_PROMO_NOV26.png',         
        benefit: 'Descuento desde $578,000 MXN sobre el precio de venta',         
        tag: 'Venta Nocturna',         
        targetDate: '2026-11-30T23:59:59',         
        highlights: [             
            'Descuento desde $578,000 MXN',             
            'Últimas unidades disponibles',             
            'Válido solo para departamentos de la Torre 1 y 2',             
            'Aplica restricciones'         
        ],         
        terms: 'Aplica restricciones. Válido del 1 al 30 de noviembre de 2026. Válido solo para departamentos de la Torre 1 y 2. Orve Inmobiliaria.',         
        validity: '1 - 30 Noviembre 2026'     
    },
    {         
        id: 'rosenda-temozon',         
        categoryKey: 'rosenda-temozon',         
        categoryName: 'Rosenda Temozón',         
        title: 'Elige tu senda, elige a tu modo',         
        subtitle: 'Departamentos en Temozón Norte',         
        image: 'https://res.cloudinary.com/crnwqzqq/image/upload/v1794257977/ROSENDA_PROMO_NOV26.png',         
        benefit: '4% de descuento en la unidad',         
        tag: 'Descuento Especial',         
        targetDate: '2026-11-30T23:59:59',         
        highlights: [             
            '4% de descuento directo en el valor de la unidad',             
            'Departamentos exclusivos en Temozón Norte',             
            'Diseño vanguardista y alta plusvalía'         
        ],         
        terms: 'Aplica restricciones. Válido del 1 al 30 de noviembre de 2026. Orve Inmobiliaria.',         
        validity: '1 - 30 Noviembre 2026'     
    },
    {         
        id: 'tulum-ha',         
        categoryKey: 'tulum-ha',         
        categoryName: 'Tulum Ha',         
        title: 'Tulum Ha - Comunidad Natural',         
        subtitle: 'Últimas unidades disponibles',         
        image: 'https://res.cloudinary.com/crnwqzqq/image/upload/v1794257976/TULUMHA_PROMO_NOV26.png',         
        benefit: 'Descuento desde $143,298 MXN sobre el valor de la unidad',         
        tag: 'Últimas Unidades',         
        targetDate: '2026-11-30T23:59:59',         
        highlights: [             
            'Descuento desde $143,298 MXN',             
            'Comunidad natural en Tulum',             
            'Últimas unidades disponibles'         
        ],         
        terms: 'Aplica restricciones. Válido del 1 al 30 de noviembre de 2026. Orve Inmobiliaria.',         
        validity: '1 - 30 Noviembre 2026'     
    },
    {         
        id: 'ukana-merida',         
        categoryKey: 'ukana-merida',         
        categoryName: 'Ukana Mérida',         
        title: 'Ukana Mérida - El lugar que soñaste',         
        subtitle: 'El lugar que soñaste, hoy es tuyo.',         
        image: 'https://res.cloudinary.com/crnwqzqq/image/upload/v1794257976/UKANAMID_PROMO_NOV26.png',         
        benefit: '6% de descuento sobre el valor del departamento',         
        tag: 'Descuento Exclusivo',         
        targetDate: '2026-11-30T23:59:59',         
        highlights: [             
            '6% de descuento sobre el valor del departamento',             
            'Últimas unidades disponibles',             
            'Válido solo para Torre 1'         
        ],         
        terms: 'Aplica restricciones. Válido del 1 al 30 de noviembre de 2026. Válido solo para Torre 1. Orve Inmobiliaria.',         
        validity: '1 - 30 Noviembre 2026'     
    },
    {         
        id: 'ukana-playa-del-carmen',         
        categoryKey: 'ukana-playa-del-carmen',         
        categoryName: 'Ukana Playa del Carmen',         
        title: 'Ukana Playa del Carmen - Entrega Inmediata',         
        subtitle: 'Vive en el lugar de tus sueños.',         
        image: 'https://res.cloudinary.com/crnwqzqq/image/upload/v1794257977/UKANAPDC_PROMO_NOV26.png',         
        benefit: 'Descuento de $325,282 MXN sobre el valor de la unidad',         
        tag: 'Entrega Inmediata',         
        targetDate: '2026-11-30T23:59:59',         
        highlights: [             
            'Descuento de $325,282 MXN sobre el valor de la unidad',             
            'Entrega inmediata en Playa del Carmen',             
            'Ubicación privilegiada cerca de la costa'         
        ],         
        terms: 'Aplica restricciones. Válido del 1 al 30 de noviembre de 2026. Orve Inmobiliaria.',         
        validity: '1 - 30 Noviembre 2026'     
    }
];

// --- DATOS DE DESARROLLOS --- 
const developments = [     
    {         
        id: "ccm",         
        title: "Ciudad Central Mérida",         
        category: ["Terrenos Residenciales","Viviendas"],         
        categoryLabel: ["Terrenos Residenciales","Viviendas"],         
        location: "Tixkokob, Yucatán",         
        size: "A partir de 133 m²",         
        price: "$678,300 MXN",         
        media: [             
            { type: 'video', url: 'https://www.youtube.com/embed/6egHYAF94Fo' },             
            { type: 'video', url: 'https://www.youtube.com/embed/pv2hGwE_UKA' },             
            { type: 'image', url: 'https://res.cloudinary.com/crnwqzqq/image/upload/v1794001175/ACCESO_NORTE_1.jpg' },             
            { type: 'image', url: 'https://res.cloudinary.com/crnwqzqq/image/upload/v1792998539/CCM_General.jpg' },             
            { type: 'image', url: 'https://res.cloudinary.com/crnwqzqq/image/upload/v1792998325/06.jpg' },             
            { type: 'image', url: 'https://res.cloudinary.com/crnwqzqq/image/upload/v1792998324/01_Fachada.jpg' }         
        ],         
        badge: "Preventa",         
        payments: ["Recursos propios", "A pagos", "Crédito bancario"],         
        description: "Terrenos residenciales y townhouses a minutos de Mérida, Yucatán, dentro de una comunidad planeada con amenidades de primer nivel. Una opción para vivir, invertir y construir patrimonio en una zona estratégica de la ciudad.",         
        lots: [             
            {                 
                "title": "Lote 133 M²",                 
                "blueprint_url": "https://res.cloudinary.com/crnwqzqq/image/upload/v1794036175/Lote-133-M2-CCM.png",                 
                "dimensions": {                   
                    "total_area": "133 m²",                   
                    "front": "7 M",                   
                    "depth": "19 M"                 
                },                 
                "price": {                   
                    "list_price": "$678,300 MXN",   
                },                 
                "financing": {                   
                    "reservation": "$1,000 MXN",                   
                    "down_payment": "$81,396 MXN (12%)",                   
                    "payment_methods": [                     
                        "De contado",                     
                        "A pagos"
                  ],
                    "delivery": "5 años"
                },                 
                "description": [                   
                    "Mensualidades desde $3,316 MXN"
                ],                 
                "video_url": "https://www.youtube.com/embed/LjqOJavyzJc"             
            },             
            {                 
                "title": "Lote Irregular 247.29 M²",                 
                "blueprint_url": "https://res.cloudinary.com/crnwqzqq/image/upload/v1794001393/Lote-247.29-M2-CCM.png",                 
                "dimensions": {                   
                    "total_area": "247.29 M²",                   
                    "front": "7 M",                   
                    "depth": "19 M"                 
                },                 
                "price": {                   
                    "list_price": "$1,261,179 MXN"
                },                 
                "financing": {                   
                    "reservation": "$1,000 MXN",                   
                    "down_payment": "$151,341.48  MXN (12%)",                   
                    "payment_methods": [                     
                        "De contado",                     
                        "A pagos"
                  ],
                    "delivery": "5 años"
                },                 
                "description": [                   
                    "Mensualidades desde $6,165 MXN",
                    "Terreno Irregular"
                ]             
            },             
            {                 
                "title": "Lote Irregular 304.3 M²",                 
                "blueprint_url": "https://res.cloudinary.com/crnwqzqq/image/upload/v1794001441/Lote-304.3-M2-CCM.png",                 
                "dimensions": {                   
                    "total_area": "304.3 M²",                   
                    "front": "7 M",                   
                    "depth": "19 M"                 
                },                 
                "price": {                   
                    "list_price": "$1,551,930 MXN"                 
                },                 
                "financing": {                   
                    "reservation": "$1,000 MXN",                   
                    "down_payment": "$186,231.60 MXN (12%)",                   
                    "payment_methods": [                     
                        "De contado",                     
                        "A pagos"   ],
                    "delivery": "5 años"
                },                 
                "description": [                   
                    "Mensualidades desde $7,587 MXN",
                    "Terreno Irregular"
                    
                ]
            }         
        ],
        homes: [             
            {                 
                "title": "Townhouse",                 
                "blueprint_url": "https://res.cloudinary.com/crnwqzqq/image/upload/v1794294943/Townhouse-CCM.jpg",            
                "dimensions": {   
                    
                    "built_area" : "120 m²",
                    
                    "total_area": "133 m²",                   
                    "front": "7 M",                   
                    "depth": "19 M"                 
                },                 
                "price": {                   
                    "list_price": "$2,600,524.80 MXN"                 
                },                 
                "financing": {                   
                    "reservation": "$10,000 MXN",                   
                    "down_payment": "260,052.48 MXN (10%)",                   
                    "payment_methods": [                     
                        "De contado",                 
                        "Crédito bancario"                   ],
                    "delivery": "Inmediata"
                },                 
                "description": [      
                    "3 Recámaras",
                    "3 Baños completos",
                    "Cocina equipada",
                    "Sala - comedor", 
                    "Área de lavado",
                    "Jardín"  
                ],                 
                "video_url": "https://www.youtube.com/embed/Je3SkMNYmQY"             
            },             
            {                 
                "title": "Par Uno",                 
                "blueprint_url": "https://res.cloudinary.com/crnwqzqq/image/upload/v1794294749/Par-Uno-CCM.jpg",                 
                "dimensions": {   
                    
                    "built_area" : "143.53 m2",
                    
                    "total_area": "152 m²",                   
                    "front": "8 M",                   
                    "depth": "19 M"                 
                },                 
                "price": {                   
                    "list_price": "$3,081,443 MXN",                   
                    "discount": "3%",                   
                    "final_price": "$2,989,000 MXN"                 
                },                 
                "financing": {                   
                    "reservation": "$10,000 MXN",                   
                    "down_payment": "$616,289 MXN (20%)",                   
                    "payment_methods": [                     
                        "De contado",                     
                        "A pagos",                    
                        "Crédito bancario"                   ],
                    "delivery": "Noviembre 2028"
                },                 
                "description": [      "2 Recámaras con closet",
                    "2 Baños ½",
                    "Sala/Comedor",
                    "Cocina",
                    "Área de lavado",
                    "Cochera",
                    "Jardín"
                    
                ],
                "video_url": "https://www.youtube.com/embed/LTKgafSL0mU" 
            }
        ],  
        amenities: [             
            "Casa Club",             
            "Piscinas",             
            "Terrazas",             
            "Espacios sociales",             
            "Parque Urbano",             
            "Áreas verdes",             
            "Conectividad peatonal",             
            "Espacios para eventos",             
            "Campo de Golf",             
            "Canchas deportivas",             
            "Ciclovías / Bikepark",             
            "Áreas de juegos infantiles",             
            "Zonas de lectura",             
            "Espacios culturales",             
            "Club de Playa exclusivo"         
        ],         
        infrastructure: [             
            "Calles pavimentadas y banquetas amplias",             
            "Iluminación LED en vialidades y áreas comunes",             
            "Servicios subterráneos",             
            "Acceso controlado y vigilancia 24/7",             
            "Área de food trucks",             
            "Estacionamientos"         
        ],         
        strategicLocation: [             
            "A minutos de centros comerciales, hospitales y universidades",             
            "Conectado al periférico para moverte fácilmente por toda la ciudad",             
            "Cercano a zonas de crecimiento y desarrollo urbano",             
            "Acceso rápido a servicios, entretenimiento y cultura"         
        ],         
        mapUrl: "https://maps.google.com/maps?q=Ciudad%20Central%2C%20M%C3%A9rida%2C%20Yucat%C3%A1n&t=&z=10&ie=UTF8&iwloc=&output=embed"     
    },     
    {         
        id: "ccp",         
        title: "Ciudad Central Progreso",         
        category: "Terrenos Residenciales",         
        categoryLabel: "Terrenos Residenciales",         
        location: "Progreso, Yucatán",         
        size: "A partir de 133 m²",         
        price: "$632,282 MXN",         
        media: [             
            { type: 'video', url: 'https://www.youtube.com/embed/AYgNyETCi94' },             
            { type: 'video', url: 'https://www.youtube.com/embed/pv2hGwE_UKA' },             
            { type: 'image', url: 'https://res.cloudinary.com/crnwqzqq/image/upload/v1794002660/ciudad-central-progreso-terrenos-residenciales-en-yucatan-1536x864.jpg' }         
        ],         
        badge: "Preventa",         
        payments: ["Recursos propios", "A pagos", "Crédito bancario"],         
        description: "Terrenos residenciales cerca del mar en Progreso, Yucatán, dentro de un desarrollo de gran escala con amenidades y espacios recreativos. Ideal para quienes buscan inversión inmobiliaria con conexión a Mérida y la costa Yucateca.",         
        lots: [             
            {                 
                "title": "Lote 133 M²",                 
                "blueprint_url": "https://res.cloudinary.com/crnwqzqq/image/upload/v1794001335/Lote-133-M2-CCP.png",                 
                "dimensions": {                   
                    "total_area": "133 m²",                   
                    "front": "7 M",                   
                    "depth": "19 M"                 
                },                 
                "price": {                   
                    "list_price": "$632,282 MXN"               
                },                 
                "financing": {                   
                    "reservation": "$1,000 MXN",                   
                    "down_payment": "$75,873.84  MXN (12%)",                   
                    "payment_methods": [                     
                        "De contado",                     
                        "A pagos"
                     ],
                    "delivery": "5 años"
                },                 
                "description": [                   
                    "Mensualidades desde $3,091 MXN"                 ]
            },             
            {                 
                "title": "Lote Irregular 250.75 M²",                 
                "blueprint_url": "https://res.cloudinary.com/crnwqzqq/image/upload/v1794002804/Lote-250.75-M2-CCP.webp",                 
                "dimensions": {                   
                    "total_area": "250.75 M²",                   
                    "front": "14 M",                   
                    "depth": "19 M"                 
                },                 
                "price": {                   
                    "list_price": "$1,192,065 MXN"
                },                 
                "financing": {                   
                    "reservation": "$1,000 MXN",                   
                    "down_payment": "$143,047.86 MXN (12%)",                   
                    "payment_methods": [                     
                        "De contado",                     
                        "A pagos"                  
                    ],
                    "delivery": "5 años"
                },                 
                "description": [                   
                    "Mensualidades desde $5,827 MXN",
                    "Terreno Irregular"]             
            },             
            {                 
                "title": "Lote Irregular 299.84 M²",                 
                "blueprint_url": "https://res.cloudinary.com/crnwqzqq/image/upload/v1794002855/Lote-299.84-M2-CCP.webp",                 
                "dimensions": {                   
                    "total_area": "299.84 M²",                   
                    "front": "17.37 M",                   
                    "depth": "19 M"                 
                },                 
                "price": {                   
                    "list_price": "$1,425,439 MXN"                 
                },                 
                "financing": {                   
                    "reservation": "$1,000 MXN",                   
                    "down_payment": "$ 171,052.72 MXN (12%)",                   
                    "payment_methods": [                     
                        "De contado",                     
                        "A pagos"       
                    ],
                    "delivery": "5 años"
                },                 
                "description": [                   
                    "Mensualidades desde $6,968 MXN",
                    "Terreno Irregular"]
            }         
        ],         
        amenities: [             
            "Club de playa",             
            "Área de camastros",             
            "Pool bar",             
            "Rooftop",             
            "Canales de agua",             
            "Lago con muelle",             
            "Ojos de agua",             
            "Kayaks",             
            "Ciclovías",             
            "Canchas deportivas",             
            "Espacios recreativos",             
            "Zonas deportivas"         ],         
        infrastructure: [             
            "Calles pavimentadas y banquetas amplias",             
            "Iluminación LED en vialidades y áreas comunes",             
            "Servicios subterráneos para una estética limpia y funcional",             
            "Acceso controlado y vigilancia 24/7"         ],         
        strategicLocation: [             
            "Playa de Progreso, galardonada como Blue Flag (14 km)",             
            "Mérida (19 km)",             
            "Chicxulub puerto (Lugar donde cayó el meteorito)",             
            "Museo del meteorito",             
            "Universidades"         ],         
        mapUrl: "https://maps.google.com/maps?q=Ciudad%20Central%20Progreso%2C%20Para%C3%ADso%2C%20Yucat%C3%A1n&t=&z=10&ie=UTF8&iwloc=A&output=embed"     }
];