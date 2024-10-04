
const Contact = () => {
  return (
    <section>
      <div className='px-4 mx-auto max-w-screen-md'>
        <h2 className='heading text-center'>Contact Us</h2>
        <p className='mb-0 lg:mb-16 font-light text-center text__para'>
          For booking support or barber inquiries, we’re here to assist!
          Reach out for help and enjoy top-notch grooming on campus.
        </p>

        <form action="a" className='space-y-8'>
          <div>
            <label htmlFor="email" className='form__label'> Your Email</label>
            <input
              type="email"
              id='email'
              placeholder='email@gmail.com'
              className='form__input mt-1 focus:outline-none focus:border-primaryColor'
            />
          </div>
          <div>
            <label htmlFor="subject" className='form__label'> Subject</label>
            <input
              type="text"
              id='subject'
              placeholder='Let us know how we can help you'
              className='form__input mt-1 focus:outline-none focus:border-primaryColor'
            />
          </div>
          <div className='sm:col-span-2'>
            <label htmlFor="message" className='form__label'> Your message</label>
            <textarea
              rows='6'
              type="text"
              id='message'
              placeholder='Leave a comment.....'
              className='form__input mt-1 focus:outline-none focus:border-primaryColor'
            />
          </div>
          <button type='submit'
            className='btn rounded sm:w-fit'>
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact