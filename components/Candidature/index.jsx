import React from 'react';
import styles from './Candidature.module.scss';
import cookie from 'cookie';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';

const Candidature = ({ event, candidature, candidate, token, role }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    job_id: candidature.job_id, 
    user_id: candidature.user_id, 
    hired: !candidature.hired
  });

  const handleHire = () => {
    form.hired == true ? setForm({...form, hired: false}) : setForm({...form, hired: true})
    handleCandidature()
  }

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
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.Candidature}>
      {form.hired===true && role === 'employer' &&
        <button className={styles.Candidature__hired} onClick={handleHire}>
          <Image
            src="/images/Button/validated.svg"
            height={20} 
            width={20} 
            alt="waiting validation tick"
          />
        </button>
      }
      {form.hired===false && role === 'employer' &&
        <button className={styles.Candidature__nothired} onClick={handleHire}>
          <Image
            src="/images/Button/valid.svg"
            height={20} 
            width={20} 
            alt="validated plain tick"
          />
        </button>
      }
      {form.hired===true && role === 'candidate' &&
        <div className={styles.Candidature__hired} >
          <Image
            src="/images/Button/validated.svg"
            height={20} 
            width={20} 
            alt="waiting validation tick"
          />
        </div>
      }
      {form.hired===false && role === 'candidate' &&
        <div className={styles.Candidature__nothired} >
          <Image
            src="/images/Button/valid.svg"
            height={20} 
            width={20} 
            alt="validated plain tick"
          />
        </div>
      }
      { role === 'employer' &&
        <Link href={`/user/${candidate.id}`}>
          <a>{candidate && `${candidate.first_name} ${candidate.last_name}`}</a>
        </Link>
      } 
      { role === 'candidate' &&
        <p>{candidate && `${candidate.first_name} ${candidate.last_name}`}</p> 
      }
    </div>
  );
}

export default Candidature;