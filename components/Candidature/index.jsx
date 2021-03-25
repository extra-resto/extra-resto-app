import React from 'react';
import styles from './Candidature.module.scss';
import cookie from 'cookie';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';

const Candidature = ({ event, candidature, candidate, token }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    job_id: candidature.job_id, 
    user_id: candidature.user_id, 
    hired: !candidature.hired
  });

  

  const handleCandidature = async () => {
    try {
      const req = await fetch(`http://localhost:3000/api/candidatures/${candidature.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
      })
      router.replace(router.asPath)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.Candidature}>
      {candidature.hired===true && <button className={styles.Candidature__hired} onClick={handleCandidature}>
      <Image
        src="/images/Button/validated.svg"
        height={20} 
        width={20} 
        alt="waiting validation tick"
        />
      </button>}
      {candidature.hired===false && <button className={styles.Candidature__nothired} onClick={handleCandidature}>
      <Image
        src="/images/Button/valid.svg"
        height={20} 
        width={20} 
        alt="validated plain tick"
      />
      </button>}
      <Link href={`/users/${candidate.id}`}>
        <a>{candidate && `${candidate.first_name} ${candidate.last_name}`}</a>
      </Link>
    </div>
  );
}

export default Candidature;