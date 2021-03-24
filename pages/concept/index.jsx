import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './Concept.module.scss';
import Image from 'next/image';
import Button from 'components/Button';
import Link from 'next/link';

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
          <Button content="Espace Candidat"></Button>
          <Button content="Espace Recruteur"></Button>
          </div>

        </div>
        <div className={styles.Concept__Hero__image}>
          <Image src="/images/icons/barman-waiter.svg" alt="barman waiter drawing" height={500} width={200} />
        </div>
      </div>
      <div className={styles.Concept__Explanation}>
        <div className={styles.Concept__Explanation__text}>
          <h2>Extracadabra, la meilleure solution pour recruter des Extras ou CDI</h2>
          <h3>« Recevez une réponse de profil en 3 min en moyenne  »</h3>
          <h3>« Taux de satisfaction de 92% des managers sur les jobs effectués »</h3>
          <p>Pour vos recrutements en hôtellerie-restauration, vente ou logistique, Extracadabra est la solution idéale ! Vous avez besoin d’une serveuse en CDI, d’un cuisinier en extra pour ce soir ou d’un préparateur de commande pour la semaine prochaine ? Nous vous proposons du personnel qualifié à tous les postes en salle, bar, et cuisine, vente ou logistique. Téléchargez notre application ou inscrivez-vous sur notre site pour trouver du personnel en France en un claquement de doigts !</p>
          <h3>Le recrutement en Hôtellerie-restauration, vente et logistique. Vous cherchez à recruter des extras ou des CDI ?</h3>
        </div>
      </div>
      <div className={styles.Concept__thumbnail}>
        <div className={styles.Concept__thumbnail__title}>
          <h2>Le concept</h2>
        </div>
        <div className={styles.Concept__thumbnail__cards}>
          <div className={styles.Concept__thumbnail__cards__image}>
            <Image 
            src="/images/Navbar/eye.svg"
            height={120} 
            width={120} 
            alt="extra-resto logo"
            />
            <h3>Des profils vérifiés</h3>
            <h4>Nous vérifions une à une leurs expériences avant de les valider</h4>
          </div>
          <div className={styles.Concept__thumbnail__cards__image}>
            <Image 
            src="/images/Navbar/eye.svg"
            height={120} 
            width={120} 
            alt="extra-resto logo"
            />
            <h3>Des profils vérifiés</h3>
            <h4>Nous vérifions une à une leurs expériences avant de les valider</h4>
          </div>
          <div className={styles.Concept__thumbnail__cards__image}>
            <Image 
            src="/images/Navbar/eye.svg"
            height={120} 
            width={120} 
            alt="extra-resto logo"
            />
            <h3>Des profils vérifiés</h3>
            <h4>Nous vérifions une à une leurs expériences avant de les valider</h4>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default Concept;

