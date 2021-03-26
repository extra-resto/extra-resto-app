import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './Home.module.scss';
import Cookie from 'js-cookie';
import Button from 'components/Button';
import Image from 'next/image';


const Home = () => {
  const [role, setRole] = useState(Cookie.get('role'));
  const router = useRouter()

  useEffect(() => {
    if (role == 'employer') router.push('/employer_home');
    if (role == null) router.push('/');
  }, [role])

  

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
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.Home}>
          <h1 className={styles.Home__title}>Le recrutement en
            hôtellerie-restauration ?
          </h1>
      <div className={styles.Concept__Hero}>
        <div className={styles.Concept__Hero__cta}>
          <h2 className={styles.Concept__Hero__cta__title}>
            Trouvez votre personnel ou un emploi
            avec Extra-Resto
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
      <div className={styles.Concept__Explanation}>
        <div className={styles.Concept__Explanation__text}>
          <h2>Extracadabra, la meilleure solution pour recruter des Extras ou CDI</h2>
          <h3>« Recevez une réponse de profil en 3 min en moyenne  »</h3>
          <h3>« Taux de satisfaction de 92% des managers sur les jobs effectués »</h3>
          <p>Pour vos recrutements en hôtellerie-restauration, Extra-Resto est la solution idéale ! Vous avez besoin d’une serveuse en CDI, d’un cuisinier en extra pour ce soir ou d’un préparateur de commande pour la semaine prochaine ? Nous vous proposons du personnel qualifié à tous les postes en salle, bar, et cuisine. Inscrivez-vous sur notre site pour trouver du personnel en France en un claquement de doigts !</p>
          <h3>Le recrutement en Hôtellerie-restauration. Vous cherchez à recruter des extras ou des CDI ?</h3>
        </div>
      </div>
      <div className={styles.Concept__thumbnail}>
        <div className={styles.Concept__thumbnail__title}>
          <h2>Le concept</h2>
        </div>
        <div className={styles.Concept__thumbnail__cards}>
          <div className={styles.Concept__thumbnail__cards__image}>
          <Image 
            src="/images/icons/waiter-svgrepo-com.svg"
            height={120} 
            width={120} 
            alt="extra-resto logo"
            />
            <h3>Besoin de personnel en extra ?</h3>
            <h4>Nous vous mettons en relation avec des profils qualifiés
                avec les restaurants, bars et traiteurs</h4>
            </div>
          <div className={styles.Concept__thumbnail__cards__image}>
            <Image 
              src="/images/icons/chef-svgrepo-com (2).svg"
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
    </Layout>
  );
}

export default Home;
