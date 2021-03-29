import React from 'react';
import styles from './Application.module.scss';
import cookie from 'cookie';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import config from 'config/config.json';

const Application = ({ job, token, user_id }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    jobs_id: job.id
  });
  const [applied, setApplied] = useState(false);

  const getApplicationStatus = () => {
    return job.candidatures.filter(candidature => candidature.user_id === parseInt(user_id)).length > 0
  }

  useEffect(() => {
    getApplicationStatus()
  }, [job.candidatures])
  
  const handleApplication = async () => {
    try {
      const req = await fetch(`${config.SERVER_URL}candidatures`, {
          method: 'POST',
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

  const deleteApplication = async () => {
    const candidature_id = job.candidatures.filter(candidature => candidature.user_id === parseInt(user_id))[0].id
    try {
      const req = await fetch(`${config.SERVER_URL}candidatures/${candidature_id}`, {
          method: 'DELETE',
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
    <div className={styles.Application}>
      {applied===true && 
        <button className={styles.Application__waiting} onClick={deleteApplication}>
          Déjà postulé
        </button>
      }
      {applied===false &&
        <button className={styles.Application__nothired} onClick={handleApplication}>
          Postuler
        </button>
      }
    </div>
  );
}

export default Application;