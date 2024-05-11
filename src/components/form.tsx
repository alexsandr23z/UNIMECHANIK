import { FormEvent, useCallback, useState } from "react";

type TForm = {
  formActive: boolean;
  setFormActive: (arg: boolean) => void;
}

function Form({formActive, setFormActive}: TForm) {
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    email: '',
    type: '',
    socialAvc: '',
    socialVk: '',
    socialOk: '',
    socialFacebook: '',
    socialInstagram: '',
    socialYoutube: '',
    director: '',
    valid: false,  
  });

  const handleCloseForm = () => {
    document.body.style.overflow = 'unset';
    setFormActive(false);
  } 

  const isFormValid = useCallback(() => {
    const { name, tel, email, type, socialAvc, socialFacebook, socialInstagram, socialOk, socialVk, socialYoutube, director } = formData;
    return (
      name.trim() !== '' &&
      tel.trim() !== '' &&
      email.trim() !== '' &&
      socialAvc.trim() !== '' &&
      socialFacebook.trim() !== '' &&
      socialInstagram.trim() !== '' &&
      socialOk.trim() !== '' &&
      socialVk.trim() !== '' &&
      socialYoutube.trim() !== '' &&
      director.trim() !== '' &&
      type !== '' &&
      type !== undefined
    );
  }, [formData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      valid: isFormValid()
    });
  };

  const handleBlur = () => {
    setFormData({
      ...formData,
      valid: isFormValid()
    });
  };

  const handleReset = () => {
    setFormData({
      ...formData,
      name: '',
      tel: '',
      email: '',
      type: '',
      socialAvc: '',
      socialVk: '',
      socialOk: '',
      socialFacebook: '',
      socialInstagram: '',
      socialYoutube: '',
      director: '',
      valid: false,        
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {        
      const response = await fetch('https://run.mocky.io/v3/a00b0beb-1fbf-4bd6-bab5-127dac6c5da7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });  
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return(
    <div className={formActive ? 'modal is-active' : 'modal'}>
      <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
        <div className='modal__overlay' onClick={handleCloseForm}/>
        <div className="modal__content">
          <h2 className="modal__title">Стать партнёром проекта</h2>
          <form className="modal__form form" onSubmit={handleSubmit}>
            <div className="form__wrapper">
              <fieldset className="form__section-person">
                <legend className="visually-hidden">Данные пользователя</legend>
                <div className="custom-input form__input">
                  <label className="custom-input__label" htmlFor="name"></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Название организации"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="custom-input form__input">
                  <label className="custom-input__label" htmlFor="tel"></label>
                  <input
                    type="number"
                    id="tel"
                    name="tel"
                    placeholder="Телефон"
                    required
                    pattern="/^[0-9]{11,}$/"
                    value={formData.tel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="custom-input form__input">
                  <label className="custom-input__label" htmlFor="email"></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </fieldset>
              <fieldset className="form__section-img">
                <div className="section__title">
                  <span className="star">✱</span>
                  <p className="title">Логотип (jpeg, png)</p>
                </div>
                <div className="section__image">
                  <div className="image"><span className="image__text">Выберите <br/>файл</span></div>
                  <button className="button button__image--open" type="button"></button>
                  <button className="button button__image--close" type="button">
                    <img src="/close.svg" alt="close"/>
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="form__social">
              <fieldset className="form__social-section">
                <div className="social__select-wrap">
                  <div className="section__title">
                    <span className="star__select">✱</span>
                    <p className="title__select">Направление</p>
                  </div>
                  <select className="social__select" name="type" onChange={handleChange} onBlur={handleBlur}>
                    <option value=''></option>
                    <option value='Экология'>Экология</option>
                    <option value='Логистика'>Логистика</option>
                    <option value='Энергетика'>Энергетика</option>
                    <option value='Фармацевтика'>Фармацевтика</option>
                  </select>
                </div>
                <div className="custom-input social__input">
                  <label className="custom-input__label" htmlFor="socialAvc"></label>
                  <input
                    type="text"
                    id="socialAvc"
                    name="socialAvc"
                    required
                    value={formData.socialAvc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                   <img className="social__img" src="/avc.svg" alt="avc"/>
                </div>
                <div className="custom-input social__input">
                  <label className="custom-input__label" htmlFor="socialVk"></label>
                  <input
                    type="text"
                    id="socialVk"
                    name="socialVk"
                    required
                    value={formData.socialVk}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <img className="social__img" src="/vk.svg" alt="вконтакте"/>
                </div>
                <div className="custom-input social__input">
                  <label className="custom-input__label" htmlFor="socialOk"></label>
                  <input
                    type="text"
                    id="socialOk"
                    name="socialOk"
                    required
                    value={formData.socialOk}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <img className="social__img" src="/ok.svg" alt="одноклассники"/>
                </div>
                <div className="custom-input social__input">
                  <label className="custom-input__label" htmlFor="socialFacebook"></label>
                  <input
                    type="text"
                    id="socialFacebook"
                    name="socialFacebook"
                    required
                    value={formData.socialFacebook}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <img className="social__img" src="/facebook.svg" alt="facebook"/>
                </div>
                <div className="custom-input social__input">
                  <label className="custom-input__label" htmlFor="socialInstagram"></label>
                  <input
                    type="text"
                    id="socialInstagram"
                    name="socialInstagram"
                    required
                    value={formData.socialInstagram}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <img className="social__img" src="/instagram.svg" alt="instagram"/>
                </div>
                <div className="custom-input social__input">
                  <label className="custom-input__label" htmlFor="socialYoutube"></label>
                  <input
                    type="text"
                    id="socialYoutube"
                    name="socialYoutube"
                    required
                    value={formData.socialYoutube}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <img className="social__img" src="/youtube.svg" alt="youtube"/>
                </div>
                <div className="custom-input social__input social__input-director">
                  <label className="custom-input__label" htmlFor="director"></label>
                  <input
                    type="text"
                    id="director"
                    name="director"
                    placeholder="Руководитель"
                    required
                    value={formData.director}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </fieldset>
              <button 
                className="button form__button form__submit"
                type="submit" 
                disabled={formData.valid === false}
              >
                  Стать партнёром проекта
              </button>
              <button 
                className="button form__button form__reset"
                type="reset" onClick={handleReset}>
                  Отменить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form;
