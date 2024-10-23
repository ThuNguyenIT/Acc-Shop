export const requiredIcon = (condition?: boolean) => {
  return condition ? <span className='text-red-500'>*</span> : null
}
