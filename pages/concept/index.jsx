import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import styles from './Concept.module.scss';
import Image from 'next/image';

const Concept = () => {
  return (
    <Layout>
    <div className={styles.Concept}>
      <Head>
        <title>extra-resto - Concept</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.Concept__Hero}>
        <div className={styles.Concept__Hero__cta}>
          <h1>Le recrutement en
            hôtellerie-restauration,
            vente ou logistique ?
            Trouvez votre personnel ou un emploi
            avec Extra-Resto
          </h1>
          <h2>Le recrutement en
              hôtellerie-restauration,
              vente ou logistique ?
              Trouvez votre personnel ou un emploi
              avec Extra-Resto
              Mise en relation de profils qualifiés
              avec les Restaurants, Bars, Traiteurs, Hôtels, Entrepôts, Magasins ...
              en Extra ou CDI en moins de 3 minutes
          </h2>
          <div className={styles.Concept__Hero__cta__buttons}>
            <button>Espace Candidat</button>
            <button>Espace Recruteur</button>
          </div>
        </div>
        <div className={styles.Concept__Hero__image}>
          <Image src="/images/icons/barman-waiter.svg" alt="barman waiter drawing" height={500} width={200} />
        </div>
      </div>

      
    </div>
    </Layout>
  );
}

export default Concept;
