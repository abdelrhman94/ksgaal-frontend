import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

const Header: FC<{ headerData: any }> = ({ headerData }) => {
  const router = useRouter();
  const { t, lang } = useTranslation('common');
  return (
    <header>
      <h1>Hello Iam Header</h1>
      <h2>{headerData}</h2>
      <h2>{t('hello')}</h2>
      {router.locales?.map(
        (locale) =>
          locale !== router.locale && (
            <Link
              key={locale}
              // check language if arabic or english
              hrefLang={locale === 'ar' ? 'ar' : 'en'}
              href={router.asPath}
              locale={locale}
            >
              {locale == 'en' ? 'EN' : 'ع'}
            </Link>
          )
      )}
    </header>
  );
};

export default Header;
