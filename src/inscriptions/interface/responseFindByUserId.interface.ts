export interface ICourseWithModules {
  id: number;
  title: string;
  description: string;
  previewImage: string;
  isPushed: boolean;
  modules: IModuleWithStatus[];
}

export interface IModuleWithStatus {
  id: number;
  name: string;
  description: string;
  price: number;
  isPushed: boolean;
}
