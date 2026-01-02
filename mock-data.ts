import type { Ad } from './types';
import placeholderImages from './placeholder-images.json';

const getImage = (id: string) => {
    const img = placeholderImages.placeholderImages.find(p => p.id === id);
    if (!img) {
        throw new Error(`Image with id ${id} not found`);
    }
    return img;
}

export const mockAds: Ad[] = [
  {
    id: '1',
    title: 'ساعات فاخرة للبيع بالجملة',
    description: 'مجموعة جديدة من الساعات السويسرية الفاخرة، متاحة للتجار بأسعار تنافسية. جودة عالية وتصميمات عصرية.',
    category: 'اكسسوارات',
    price: 5000,
    userType: 'trader',
    image: getImage('ad-1'),
  },
  {
    id: '2',
    title: 'مطلوب مسوق رقمي خبير',
    description: 'نبحث عن مسوق رقمي لديه خبرة في حملات Google Ads و Facebook Ads لإدارة حملات إعلانية لمتجر إلكتروني كبير.',
    category: 'تسويق رقمي',
    price: 1500,
    userType: 'marketer',
    image: getImage('ad-2'),
  },
  {
    id: '3',
    title: 'سماعات أذن لاسلكية بتقنية البلوتوث',
    description: 'أحدث إصدارات سماعات الأذن اللاسلكية، مع علبة شحن تدوم طويلاً وجودة صوت استثنائية. خصم خاص للكميات.',
    category: 'إلكترونيات',
    price: 800,
    userType: 'trader',
    image: getImage('ad-3'),
  },
  {
    id: '4',
    title: 'مجموعة العناية بالبشرة الطبيعية',
    description: 'منتجات عناية بالبشرة مصنوعة من مواد طبيعية 100%. فرصة للتجار لتوزيع منتج فريد ومطلوب في السوق.',
    category: 'جمال وعناية',
    price: 1200,
    userType: 'trader',
    image: getImage('ad-4'),
  },
  {
    id: '5',
    title: 'خبير في إدارة وسائل التواصل الاجتماعي',
    description: 'مستعد لإدارة وتنمية حساباتكم على انستغرام وتويتر. خبرة في إنشاء المحتوى وزيادة التفاعل.',
    category: 'تسويق رقمي',
    price: 950,
    userType: 'marketer',
    image: getImage('ad-5'),
  },
  {
    id: '6',
    title: 'بن قهوة مختص من كولومبيا',
    description: 'محصول جديد من بن القهوة الكولومبي الفاخر. متاح للمقاهي والمحامص بأسعار الجملة.',
    category: 'أغذية ومشروبات',
    price: 250,
    userType: 'trader',
    image: getImage('ad-6'),
  },
    {
    id: '7',
    title: 'عدسات كاميرا احترافية',
    description: 'مجموعة متنوعة من عدسات الكاميرا الاحترافية لماركات Canon و Nikon. مثالية للمصورين المحترفين.',
    category: 'إلكترونيات',
    price: 4500,
    userType: 'trader',
    image: getImage('ad-7'),
  },
  {
    id: '8',
    title: 'مصمم ومطور مواقع ويب',
    description: 'أقدم خدمات تصميم وتطوير مواقع الويب باستخدام أحدث التقنيات. متخصص في واجهات المستخدم الجذابة والمواقع المتجاوبة.',
    category: 'برمجة وتطوير',
    price: 2000,
    userType: 'marketer',
    image: getImage('ad-8'),
  },
];

    