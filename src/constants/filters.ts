import { IFilter } from "@/types/IFilter"

export const filters: IFilter[] = [
    {
      label: 'Новинки',
      name: 'news',
    },
    {
      label: 'Есть в наличии',
      name: 'avalible',
    },  
    {
      label: 'Контрактные',
      name: 'contract',
    },
    {
      label:'Эксклюзивные',
      name: 'exclusive',
    },
    {
      label: 'Распродажа',
      name: 'discount'
    }
  ]
    //   'Новинки': 'news',
    //   'Есть в наличии': 'avalible',
    //   'Контрактные': 'contract',
    //   'Эксклюзивные': 'exclusive',
    //   'Распродажа': 'discount'