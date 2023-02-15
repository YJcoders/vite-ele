export type RouteConfigs = {
  path?: string;
  parentPath?: string;
  query?: object;
  params?: object;
  meta?: routeMetaType;
  children?: RouteConfigs[];
  name?: string;
};
