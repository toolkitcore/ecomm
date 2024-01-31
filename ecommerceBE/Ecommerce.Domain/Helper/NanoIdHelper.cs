namespace Ecommerce.Domain.Helper
{
    public static class NanoIdHelper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static string GenerateNanoId()
        {
            return Nanoid.Nanoid.Generate("1234567890abcdef", size: 10);
        }
    }
}
