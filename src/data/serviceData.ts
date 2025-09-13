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
            fileName: "Spec Sheet Volume 1.pdf",
            fileSize: "2.5MB",
            children: [
              {
                id: "1.1.1.1",
                fileName: "Spec Sheet for Troubleshoot.pdf",
                fileSize: "2.8MB",
              },
              {
                id: "1.1.1.2",
                fileName: "Sheet Forms for Maintenance.pdf",
                fileSize: "821KB",
              }
            ],
          },
          {
            id: "1.1.2",
            fileName: "User Guide.pdf",
            fileSize: "1.2MB",
            children: [
              {
                id: "1.1.2.1",
                fileName: "User Guide for Troubleshoot.pdf",
                fileSize: "2.8MB",
              },
              {
                id: "1.1.2.2",
                fileName: "User Guide for Maintenance.pdf",
                fileSize: "821KB",
              },
              {
                id: "1.1.2.3",
                fileName: "User Guide for Repair.pdf",
                fileSize: "2.3MB",
                children: [
                  {
                    id: "1.1.2.3.1",
                    fileName: "User Guide for Repair - Volume 1.pdf",
                    fileSize: "3.12MB",
                  },
                  {
                    id: "1.1.2.3.2",
                    fileName: "User Guide for Repair - Volume 2.pdf",
                    fileSize: "1.93MB",
                  }
                ]
              }
            ]
          },
          {
            id: "1.1.3",
            fileName: "Service Manual.pdf",
            fileSize: "1.8MB",
            children: [
              {
                id: "1.1.3.1",
                fileName: "Service Manual for Troubleshoot.pdf",
                fileSize: "2.8MB",
                children: [
                  {
                    id: "1.1.3.1.1",
                    fileName: "Sample Testing.pdf",
                    fileSize: "396KB",
                    children: [
                      {
                        id: "1.1.3.1.1.1",
                        fileName: "Dishwashing Sample for Errors.pdf",
                        fileSize: "452KB",
                      },
                      {
                        id: "1.1.3.1.1.2",
                        fileName: "Machine Sample for Troubleshoot.pdf",
                        fileSize: "971KB",
                        children: [
                          {
                            id: " 1.1.3.1.1.2.1",
                            fileName: "Machine Sample for Troubleshoot - Volume 1.pdf",
                            fileSize: "971KB",
                          },
                          {
                            id: "1.1.3.1.1.2.2",
                            fileName: "Machine Sample for Troubleshoot - Volume 2.pdf",
                            fileSize: "762KB",
                            children: [
                              {
                                id: "1.1.3.1.1.2.2.1",
                                fileName: "Machine Sample for Troubleshoot - Volume 2 - Part 1.pdf",
                                fileSize: "890KB",
                              },
                              {
                                id: "1.1.3.1.1.2.2.2",
                                fileName: "Machine Sample for Troubleshoot - Volume 2 - Part 2.pdf",
                                fileSize: "374KB",
                              }
                            ]
                          },
                          {
                            id: "1.1.3.1.1.2.3",
                            fileName: "Machine Sample for Troubleshoot - Volume 3.pdf",
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
                fileSize: "721KB",
              },
              {
                id: "1.1.3.3",
                fileName: "Service Manual for Repair.pdf",
                fileSize: "1.1MB",
                children: [
                  {
                    id: "1.1.3.3.1",
                    fileName: "Service Manual for Repair - Volume 1.pdf",
                    fileSize: "864KB",
                  },
                  {
                    id: "1.1.3.3.2",
                    fileName: "Service Manual for Repair - Volume 2.pdf",
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
            fileName: "Installation Guide.pdf",
            fileSize: "1.4MB",
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
            fileSize: "2.0MB",
          },
        ],
      }

    ],
  },

  {
    id: 2,
    title: "MEIKO BioMaster®",
    description:
      "Whether you serve 100 or more than 10,000 covers per day – we have the right solution...",
    image:
      "https://www.meiko.com/fileadmin/_processed_/5/1/csm_speise_3f18f72c19.png",
    folders: [
      {
        id: "2.1",
        folderName: "Brochures",
        image: "https://www.meiko.com/fileadmin/_processed_/b/a/csm_M-iQ_Bandtransport-Spuelmaschine_16zu9_750f9745b4.jpg",
        items: 20,
        children: [
          {
            id: "2.1.1",
            fileName: "BioMaster Overview.pdf",
            fileSize: "3.2MB",
          },
        ],
      },
    ],
  },

  {
    id: 3,
    title: "Meiko TopLine",
    description:
      "A high-performance washer-disinfector by MEIKO – with integrated drying and cooling...",
    image:
      "https://www.meiko.com/fileadmin/_processed_/b/e/csm_TopLine-10-Steckbeckenspueler_16zu9_7f75adf7bf.jpg",
    folders: [
      {
        id: "3.1",
        folderName: "Technical Documents",
        image: "https://www.meiko.com/fileadmin/_processed_/d/7/csm_trolley_0cf53c306a.png",
        items: 12,
        children: [
          {
            id: "3.1.1",
            fileName: "Technical Specs.pdf",
            fileSize: "2.1MB",
          },
        ],
      },
    ],
  }
];