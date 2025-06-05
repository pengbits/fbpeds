export const getHeaderClassFromLocation = ({pathname}) => {
  const isCollapsed = (
    pathname !== '/' &&
    pathname !== '/patients'  && 
    pathname !== '/providers' && 
    pathname.indexOf('appointments') == -1 &&
    pathname.indexOf('visits') === -1
   ) 
   console.log(pathname, isCollapsed)
   return isCollapsed ? 'header-collapsed' : ''
}