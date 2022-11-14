// export interface CatBan {

// }


export interface Ban {
  app_uid:string;
  banner_name: string;
//   [key: string]: any; // 👈️ index signature
}

export interface Cat{
    app_uid:string;
    category_name:string;
    category_image:string;
    // [key: string]: any;
}

export interface submitArray{
  banner:any;
  category:any;
}



