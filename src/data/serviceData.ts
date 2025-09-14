import type { ServiceData } from "../types/serviceTypes";

export const servicesData: ServiceData[] = [
  {
    id: 1,
    title: "Our Dishwashers",
    description:
      "For high volumes of washware, our hood type models keep proving their worth time and again...",
    image:
      "https://www.meiko.com/fileadmin/_processed_/5/7/csm_hauben_01_a3c8bbfee1.png",
    folders: [
      {
        id: "1.1",
        folderName: "Undercounter dishwashing machines",
        image: "https://www.meiko.com/fileadmin/_processed_/c/1/csm_untertisch_9cd66aff91.png",
        items: 30,
        
        children: [
          {
            id: "1.1.1",
            folderName: "Spec Sheet Volume 1",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8JXJtAvmNW4pFVcbB2H_cgM2qWMYd_Vt0mAoQyNNjVwZFmz6EKNw16q0UNEchr9igcE&usqp=CAU",
            items: 2 ,
            children: [
              {
                id: "1.1.1.1",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileName: "Spec Sheet for Troubleshoot.pdf",
                fileSize: "2.8MB",
              },
              {
                id: "1.1.1.2",
                image: "https://cdn2.vectorstock.com/i/1000x1000/70/46/rfa-file-document-icon-vector-24697046.jpg",
                fileName: "Sheet Forms for Maintenance.rfa",
                fileSize: "821KB",
              }
            ],
          },
          {
            id: "1.1.2",
            folderName: "User Guides",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8JXJtAvmNW4pFVcbB2H_cgM2qWMYd_Vt0mAoQyNNjVwZFmz6EKNw16q0UNEchr9igcE&usqp=CAU",
            items: 3,
            children: [
              {
                id: "1.1.2.1",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileName: "User Guide for Troubleshoot.pdf",
                fileSize: "2.8MB",
              },
              {
                id: "1.1.2.2",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileName: "User Guide for Maintenance.pdf",
                fileSize: "821KB",
              },
              {
                id: "1.1.2.3",
                fileName: "User Guide for Repair.pdf",
                fileSize: "2.3MB",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                children: [
                  {
                    id: "1.1.2.3.1",
                    image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                    fileName: "User Guide for Repair - Volume 1.pdf",
                    fileSize: "3.12MB",
                  },
                  {
                    id: "1.1.2.3.2",
                    fileName: "User Guide for Repair - Volume 2.pdf",
                    image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                    fileSize: "1.93MB",
                  }
                ]
              }
            ]
          },
          {
            id: "1.1.3",
            folderName: "Service Manuals",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8JXJtAvmNW4pFVcbB2H_cgM2qWMYd_Vt0mAoQyNNjVwZFmz6EKNw16q0UNEchr9igcE&usqp=CAU",
            items: 3,
            children: [
              {
                id: "1.1.3.1",
                fileName: "Service Manual for Troubleshoot.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "2.8MB",
                children: [
                  {
                    id: "1.1.3.1.1",
                    fileName: "Sample Testing.pdf",
                    image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                    fileSize: "396KB",
                    children: [
                      {
                        id: "1.1.3.1.1.1",
                        fileName: "Dishwashing Sample for Errors.rfa",
                        image: "https://cdn2.vectorstock.com/i/1000x1000/70/46/rfa-file-document-icon-vector-24697046.jpg",
                        fileSize: "452KB",
                      },
                      {
                        id: "1.1.3.1.1.2",
                        fileName: "Machine Sample for Troubleshoot.pdf",
                        image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                        fileSize: "971KB",
                        children: [
                          {
                            id: " 1.1.3.1.1.2.1",
                            fileName: "Machine Sample for Troubleshoot - Volume 1.pdf",
                            image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                            fileSize: "971KB",
                          },
                          {
                            id: "1.1.3.1.1.2.2",
                            fileName: "Machine Sample for Troubleshoot - Volume 2.pdf",
                            image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                            fileSize: "762KB",
                            children: [
                              {
                                id: "1.1.3.1.1.2.2.1",
                                fileName: "Machine Sample for Troubleshoot - Volume 2 - Part 1.pdf",
                                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                                fileSize: "890KB",
                              },
                              {
                                id: "1.1.3.1.1.2.2.2",
                                fileName: "Machine Sample for Troubleshoot - Volume 2 - Part 2.pdf",
                                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                                fileSize: "374KB",
                              }
                            ]
                          },
                          {
                            id: "1.1.3.1.1.2.3",
                            fileName: "Machine Sample for Troubleshoot - Volume 3.pdf",
                            image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                            fileSize: "453KB",
                          },
                        ],
                      },
                    ]
                  },
                ]
              },
              {
                id: "1.1.3.2",
                fileName: "Service Manual for Maintenance.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "721KB",
              },
              {
                id: "1.1.3.3",
                fileName: "Service Manual for Repair.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "1.1MB",
                children: [
                  {
                    id: "1.1.3.3.1",
                    fileName: "Service Manual for Repair - Volume 1.pdf",
                    image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                    fileSize: "864KB",
                  },
                  {
                    id: "1.1.3.3.2",
                    fileName: "Service Manual for Repair - Volume 2.pdf",
                    image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                    fileSize: "3.8MB",
                  }
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1.2",
        folderName: "Hood Type dishwashing machines",
        image: "https://www.meiko.com/fileadmin/_processed_/5/7/csm_hauben_01_70272b7678.png", 
        items: 20,
        children: [
          {
            id: "1.2.1",
            folderName: "Installation Guide",
            items: 2,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8JXJtAvmNW4pFVcbB2H_cgM2qWMYd_Vt0mAoQyNNjVwZFmz6EKNw16q0UNEchr9igcE&usqp=CAU",
            children: [
              {
                id: "1.2.1.1",
                fileName: "User Guide for Repair.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "1.93MB",
              },

              {
                id: "1.2.1.2",
                fileName: "Overview.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "1.93MB",
              }
              
            ]
          },
        ],
      },
      {
        id: "1.3",
        folderName: "Utensil Washers",
        image: "https://www.meiko.com/fileadmin/_processed_/4/a/csm_universal_4b067a9fb2.png", 
        items: 25,
        children: [
          {
            id: "1.3.1",
            fileName: "Brochure-Sample.pdf",
            image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
            fileSize: "2.0MB",
          },
        ],
      },

      {
        id: "1.4",
        folderName: "Flight Type dishwashing machines",
        image: "https://www.meiko.com/fileadmin/_processed_/b/a/csm_M-iQ_Bandtransport-Spuelmaschine_16zu9_750f9745b4.jpg", 
        items: 25,
        children: [
          {
            id: "1.4.1",
            fileName: "Brochure-Sample.pdf",
            image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
            fileSize: "2.0MB",
          },
        ],
      }

    ],
  },

  {
    id: 2,
    title: "Our Food Waste Treatment Systems",
    description:
      "Whether you serve 100 or more than 10,000 covers per day – we have the right solution...",
    image:
      "https://www.meiko.com/fileadmin/_processed_/5/1/csm_speise_3f18f72c19.png",
    folders: [
      {
        id: "2.1",
        folderName: "MEIKO BioMaster®",
        image: "https://img.nauticexpo.com/images_ne/photo-g/31345-20350889.webp",
        items: 20,
        children: [
          {
            id: "2.1.1",
            folderName: "BioMaster Overview",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8JXJtAvmNW4pFVcbB2H_cgM2qWMYd_Vt0mAoQyNNjVwZFmz6EKNw16q0UNEchr9igcE&usqp=CAU",
            items: 3,
            children: [
              {
                id: "2.1.1.1",
                fileName: "User Guide for Repair - Volume 2.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "1.93MB",
              },
              {
                id: "2.1.1.2",
                fileName: "User Guide for Repair - Volume 2.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "1.93MB",
              }
            ]
          },

          {
            id: "2.1.2",
            folderName: "Specifications",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8JXJtAvmNW4pFVcbB2H_cgM2qWMYd_Vt0mAoQyNNjVwZFmz6EKNw16q0UNEchr9igcE&usqp=CAU",
            items: 2,
            children: [
              {
                id: "2.1.2.1",
                fileName: "User Guide for Repair - Volume 2.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "1.93MB",
              }
            ]
          },
        ],
      },

      {
        id: "2.2",
        folderName: "MEIKO WasteStar FC",
        image: "https://img.nauticexpo.com/images_ne/photo-m2/31345-20350902.jpg",
        items: 20,
        children: [
          {
            id: "2.1.1",
            fileName: "BioMaster Overview.pdf",
            image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
            fileSize: "3.2MB",
          },
        ],
      },
    ],
  },

  {
    id: 3,
    title: "Our Washer-Disinfectors",
    description:
      "A high-performance washer-disinfector by MEIKO – with integrated drying and cooling...",
    image:
      "https://www.meiko.com/fileadmin/_processed_/b/e/csm_TopLine-10-Steckbeckenspueler_16zu9_7f75adf7bf.jpg",
    folders: [
      {
        id: "3.1",
        folderName: "Meiko TopLine",
        image: "https://www.meiko.com/fileadmin/_processed_/1/d/csm_TopLine-20-Steckbeckenspueler_16zu9_4dbe0f788f.jpg",
        items: 3,
        children: [
          {
            id: "3.1.1",
            folderName: "Specification Sheets",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8JXJtAvmNW4pFVcbB2H_cgM2qWMYd_Vt0mAoQyNNjVwZFmz6EKNw16q0UNEchr9igcE&usqp=CAU",
            items: 3,
            children: [
              {
                id: "3.1.1.1",
                fileName: "Technical Specs.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "2.1MB",
              },

              {
                id: "3.1.1.2",
                fileName: "Hardware Specs.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "2.1MB",
              },
            ],
          }
        ],
      },
      {
        id: "3.2",
        folderName: "Meiko Topic",
        image: "https://www.meiko.com/fileadmin/_processed_/1/d/csm_TopLine-20-Steckbeckenspueler_16zu9_4dbe0f788f.jpg",
        items: 3,
        children: [
          {
            id: "3.2.1",
            folderName: "Specification Sheets",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8JXJtAvmNW4pFVcbB2H_cgM2qWMYd_Vt0mAoQyNNjVwZFmz6EKNw16q0UNEchr9igcE&usqp=CAU",
            items: 3,
            children: [
              {
                id: "3.2.1.1",
                fileName: "Technical Specs.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "2.1MB",
              },

              {
                id: "3.2.1.2",
                fileName: "Hardware Specs.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "2.1MB",
              },
            ],
          }
        ],
      },

      {
        id: "3.3",
        folderName: "Meiko TopClean 60",
        image: "https://www.meiko.com/fileadmin/_processed_/7/c/csm_TopClean60_3_Desinfektionsgeraet_e1138bcf9a.jpg",
        items: 3,
        children: [
          {
            id: "3.3.1",
            folderName: "Specification Sheets",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8JXJtAvmNW4pFVcbB2H_cgM2qWMYd_Vt0mAoQyNNjVwZFmz6EKNw16q0UNEchr9igcE&usqp=CAU",
            items: 3,
            children: [
              {
                id: "3.3.1.1",
                fileName: "Technical Specs.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "2.1MB",
              },

              {
                id: "3.3.1.2",
                fileName: "Hardware Specs.pdf",
                image: "https://t3.ftcdn.net/jpg/03/53/29/04/360_F_353290452_GFcwsP8yZpZSdpAxKTILj0TKd5pN7XfD.jpg",
                fileSize: "2.1MB",
              },
            ],
          }
        ],
      },

    ]
  }
]