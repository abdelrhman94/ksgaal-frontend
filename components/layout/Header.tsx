import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';

import * as React from 'react';

const Header: FC<{ headerData: any }> = ({ headerData }) => {
  const router = useRouter();
  const { keycloak } = useKeycloak<KeycloakInstance>();
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
      {keycloak?.authenticated ? (
        <>
          <button
            type="button"
            className="mx-2 btn btn-outline-primary"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createAccountUrl();
              }
            }}
          >
            My Account
          </button>

          <button
            type="button"
            className="mx-2 btn btn-outline-danger"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createLogoutUrl();
              }
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="mx-2 btn btn-outline-primary"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createRegisterUrl();
              }
            }}
          >
            Signup
          </button>

          <button
            type="button"
            className="mx-2 btn btn-outline-success"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createLoginUrl();
              }
            }}
          >
            Login
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
