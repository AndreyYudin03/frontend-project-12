import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <main className="container text-center">
      <h4>{t('notFoundPage.title')}</h4>
      <h6>
        {t('notFoundPage.text')}
        {' '}
        <Link to="/">
          {' '}
          {t('notFoundPage.text_chatLink')}
        </Link>
      </h6>
    </main>
  );
};

export default NotFound;
