export const getHeaderClassFromLocation = ({pathname}) => {
  const isCollasped = (
    pathname !== '/patients'  && 
    pathname !== '/providers' && 
    pathname.indexOf('appointments') == -1
   ) 
   return isCollasped ? 'header-collapsed' : ''
}