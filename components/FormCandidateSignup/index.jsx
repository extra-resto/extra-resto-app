import styles from './FormCandidateSignup.module.scss';
import { useState, useEffect } from 'react';
import { setUser, setEmployer, setCandidate } from 'store/User/userAction';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { fileChecksum } from 'lib/checksum';
import Button from 'components/Button';

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
  const [errors, setErrors] = useState({password: '', phone_number: ''});
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
    let res = await fetch(`${process.env.API_ROOT}presigned_url`, options)
    if (res.status !== 200) return res
    return await res.json()
  }

  useEffect(() => {
    if (isSubmitting) {
      if (errors.password === '' && errors.phone_number === '') {
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
    let res = await fetch(`${process.env.API_ROOT}signup`, usersPostOptions)
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

    let err = { password: '', phone_number: '' };

    if(form.password !== form.password_confirmation) {
      err.password = 'Password and confirmation password are different'
    }
    if(form.phone_number.match(/^\d+$/) === null) {
      err.phone_number = 'Veuillez entrer un numéro valide'
    }
    
    return err;
  }

  return (
    <>
      {errors.password ? <p>La confirmation de mot de passe est différente du mot de passse</p> : null}
      {errors.phone_number ? <p>Veuillez entrer un numéro de téléphone valide</p> : null}
      <form className={styles.FormCandidateSignup} onSubmit={handleSubmit}>
        <label htmlFor="first_name">Prénom</label>
        <input 
          name="first_name" 
          type="text" 
          autoComplete="first_name" 
          onChange={handleChange} 
          required 
        />
        <label htmlFor="last_name">Nom de Famille</label>
        <input 
          name="last_name"
          type="text"
          autoComplete="last_name"
          onChange={handleChange}
          required
        />
        <label htmlFor="phone_number">n° de Téléphone</label>
        <input 
          name="phone_number"
          type="text"
          autoComplete="phone_number"
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input 
          name="email" 
          type="email" 
          autoComplete="email" 
          onChange={handleChange} 
          required 
        />
        <label htmlFor="cv">CV</label>
        <input 
          name="cv" 
          type="file"
          onChange={handleFile} 
          required 
        />
        <label htmlFor="password">Mot de passe</label>
        <input 
          name="password" 
          type="password" 
          onChange={handleChange} 
          required 
        />
        <label htmlFor="password">Confirmation de mot de passe</label>
        <input 
          name="password_confirmation" 
          type="password" 
          onChange={handleChange} 
          required 
        />
        <Button type="submit" content="S'enregistrer"/>
      </form>
    </>
  )
}

export default FormCandidateSignup;
