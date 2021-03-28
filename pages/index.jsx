import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './Home.module.scss';
import Button from 'components/Button';
import Image from 'next/image';


const Home = () => {
  const router = useRouter();

  const goToCandidate = (e) => {
    e.preventDefault()
    router.push("/signup/candidate")
  }

  const goToEmployer = (e) => {
    e.preventDefault()
    router.push("/signup/employer")
  }

  return (
    <Layout>
      <Head>
        <title>extra-resto - Home</title>
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <div className={styles.Home}>
        <h1 className={styles.Home__title}>Le recrutement en
          hôtellerie-restauration ?
        </h1>
        <div className={styles.Concept__Hero}>
          <div className={styles.Concept__Hero__cta}>
            <h2 className={styles.Concept__Hero__cta__title}>
            Trouvez votre personnel ou un emploi
            avec <span className={styles.Concept__Hero__cta__title__blue}>Extra-</span><span className={styles.Concept__Hero__cta__title__orange}>Resto</span>
          </h2>
          <h3>Extra-Resto
              Met en relation de profils qualifiés
              avec les Restaurants, Bars, Traiteurs ... 
              en Extra ou CDI en moins de 3 minutes !
          </h3>
          <div className={styles.Concept__Hero__cta__buttons}>
            <Button content="Espace Candidat" href={goToCandidate}/>
            <Button content="Espace Recruteur" href={goToEmployer}/>
          </div>
        </div>
        <div className={styles.Concept__Hero__image}>
          <Image src="/images/icons/waiter-svgrepo-com.svg" alt="barman waiter drawing" height={500} width={350} />
        </div>
      </div>
      </div>
      <div className={styles.Concept__thumbnail}>
        <div className={styles.Concept__thumbnail__title}>
        </div>
        <div className={styles.Concept__thumbnail__cards}>
          <div className={styles.Concept__thumbnail__cards__image}>
          <Image 
            src="/images/icons/chef-svgrepo-com (2).svg"
            height={150} 
            width={150} 
            alt="extra-resto logo"
            />
            <h3>Besoin de personnel en extra ?</h3>
            <h4>Nous vous mettons en relation avec des profils qualifiés
                avec les restaurants, bars et traiteurs</h4>
            </div>
          <div className={styles.Concept__thumbnail__cards__image}>
            <Image 
              src="/images/icons/tick.svg"
              height={145} 
              width={145} 
              alt="extra-resto logo"
            />
            <h3>Des profils vérifiés</h3>
            <h4>Nous vérifions une à une leurs expériences avant de les valider</h4>
          </div>
          <div className={styles.Concept__thumbnail__cards__image}>
            <Image 
            src="/images/icons/barman-waiter.svg"
            height={150} 
            width={150} 
            alt="extra-resto logo"
            />
            <h3>En recherche de job ?</h3>
            <h4>Touver un extra qui vous correspond parmis nos nombreuses propositions d'extra ou CDI</h4>
          </div>
        </div>
      </div>
      <div className={styles.Concept__Explanation}>
        <div className={styles.Concept__Explanation__text}>
          <h2>Extra-Resto, la meilleure solution pour recruter des Extras ou CDI</h2>
          <h3>« Taux de satisfaction de 92% des managers sur les jobs effectués »</h3>
          <p>Pour vos recrutements en hôtellerie-restauration, Extra-Resto est la solution idéale ! <br /> Vous avez besoin d’une serveuse en CDI ou d’un cuisinier en extra pour ce soir ? <br /> Nous vous proposons du personnel qualifié à tous les postes en salle, bar, et cuisine.</p>
          <h3>Le recrutement en Hôtellerie-restauration. Vous cherchez à recruter des extras ou des CDI ?</h3>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
