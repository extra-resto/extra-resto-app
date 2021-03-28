import styles from './FormCandidateSignup.module.scss';
import { useState, useEffect } from 'react';
import { setUser, setEmployer, setCandidate } from 'store/User/userAction';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { fileChecksum } from 'lib/checksum';
import Button from 'components/Button';
import config from 'config/config.json';
import Image from 'next/image';

const FormCandidateSignup = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ 
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirmation: '',
    role: 0
  });
  const [pdf, setPdf] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({password: '', phone_number: '', cv: ''});
  const router = useRouter();
  
  const createPresignedUrl = async(file, byte_size, checksum) => {
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: {
          filename: file.name,
          byte_size: byte_size,
          checksum: checksum,
          content_type: 'application/pdf',
          metadata: {
            'message': 'resume for parsing'
          }
        }
      })
    }
    let res = await fetch(`${config.SERVER_URL}presigned_url`, options)
    if (res.status !== 200) return res
    return await res.json()
  }

  useEffect(() => {
    if (isSubmitting) {
      if (errors.password === '' && errors.phone_number === '' && errors.cv === '') {
        registerUser();
      }
      else {
        setIsSubmitting(false);
      }
    }
  }, [errors])

  const registerUser = async () => {
  
    // To upload pdf file to S3, we need to do three steps:
    // 1) request a pre-signed PUT request (for S3) from the backend
  
    const checksum = await fileChecksum(pdf)
    const presignedFileParams = await createPresignedUrl(pdf, pdf.size, checksum)
    
    // 2) send file to said PUT request (to S3)
    const s3PutOptions = {
      method: 'PUT',
      headers: presignedFileParams.direct_upload.headers,
      body: pdf,
    }
    let awsRes = await fetch(presignedFileParams.direct_upload.url, s3PutOptions)
    if (awsRes.status !== 200) return awsRes
  
    // 3) confirm & create user with backend
    const usersPostOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: {...form, resume: presignedFileParams.blob_signed_id} })
    }
    let res = await fetch(`${config.SERVER_URL}signup`, usersPostOptions)
    if (res.status !== 200) return res
    const token = res.headers.get('Authorization');
    const result = await res.json();
    dispatch(setUser(token, result.role, result.id));
    router.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  }

  const handleFile = (e) => {
    setPdf(e.target.files[0])
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {

    let err = { password: '', phone_number: '', cv: '' };

    if(form.password !== form.password_confirmation) {
      err.password = 'Password and confirmation password are different'
    }
    if(form.phone_number.match(/^\d+$/) === null) {
      err.phone_number = 'Veuillez entrer un numéro valide'
    }
    if ( pdf.type !== 'application/pdf' ) {
      err.cv = 'Veuillez Selectionner un fichier au format Pdf'
    }
    return err;
  }

  return (
    <div className={styles.Login}>
      <div className={styles.Login__background}>
        <div className={styles.Login__background__img}>
          <h1>Candidat</h1>
          <Image src="/images/icons/waitress-svgrepo-com.svg" height={250} width={250} />
        </div>
        <div className={styles.Login__background__form}>
        {errors.password ? <p>La confirmation de mot de passe est différente du mot de passse</p> : null}
        {errors.phone_number ? <p>Veuillez entrer un numéro de téléphone valide</p> : null}
        {errors.cv ? <p>Veuillez Selectionner un fichier au format Pdf</p> : null}
          <form onSubmit={handleSubmit}>
            <div className={styles.Login__background__form__align}>
              <label htmlFor="first_name"></label>
              <input 
                placeholder="Prénom"
                name="first_name" 
                type="text" 
                autoComplete="first_name" 
                onChange={handleChange} 
                required 
              />
              <label htmlFor="last_name"></label>
              <input 
                placeholder="Nom de Famille"
                name="last_name"
                type="text"
                autoComplete="last_name"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.Login__background__form__align}>
              <label htmlFor="phone_number"></label>
              <input 
                placeholder="Téléphone"
                name="phone_number"
                type="text"
                autoComplete="phone_number"
                onChange={handleChange}
                required
              />
              <label htmlFor="email"></label>
              <input 
                placeholder="Email"
                name="email" 
                type="email" 
                autoComplete="email" 
                onChange={handleChange} 
                required 
              />
            </div>
            <label htmlFor="cv" className={styles.Login__background__form__CV}>
              <input  
                name="cv" 
                id="cv"
                type="file"
                accept=".pdf"
                onChange={handleFile} 
                required 
              />
              Ajouter votre CV
            </label>
            <div className={styles.Login__background__form__align}>
              <label htmlFor="password"></label>
              <input 
                placeholder="Mot de passe"
                name="password" 
                type="password" 
                onChange={handleChange} 
                required 
              />
              <label htmlFor="password"></label>
              <input 
                placeholder="Confirmation de mot de passe"
                name="password_confirmation" 
                type="password" 
                onChange={handleChange} 
                required 
              />
            </div>
            <Button type="submit" content="S'enregistrer"/>
          </form>
        </div>
      </div>
    </div>
)
}

export default FormCandidateSignup;
