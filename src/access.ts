/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser } | undefined,
) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: true, // 开发环境下临时允许所有用户访问
    // canAdmin: currentUser && currentUser.access === 'admin', // 生产环境下取消注释
  };
}
