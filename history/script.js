document.addEventListener('DOMContentLoaded', () => {
  const totalSlides = 4
  let currentSlide = 1
  let isAnimating = false
  let controlsAllowed = true
  let lastScrollTime = 0

  const slideTitles = [
    '蜀绣',
    '蜀绣',
    '蜀绣',
    '蜀绣',
  ]

  const slideDescriptions = [
    '蜀中瑰宝',
    '蜀中瑰宝',
    '蜀中瑰宝',
    '蜀中瑰宝',
  ]

  function createSlide(slideNumber, direction) {
    const slide = document.createElement('div')
    slide.className = 'slide'

    const slideBgImg = document.createElement('div')
    slideBgImg.className = 'slide-bg-img'

    const img = document.createElement('img')
    img.className = 'bg-image'
    img.src = `images/history/img${slideNumber}.jpg`
    // img.alt = `Image ${slideNumber}`
    img.alt = `背景图 ${slideNumber}`

    slideBgImg.appendChild(img)
    slide.appendChild(slideBgImg)

    if (direction === 'down') {
      slideBgImg.style.clipPath =
        'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
    } else {
      slideBgImg.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
    }

    return slide
  }

  function createMainImageWrapper(slideNumber, direction) {
    const wrapper = document.createElement('div')
    wrapper.className = 'slide-main-img-wrapper'

    const img = document.createElement('img')
    img.className = 'main-image'
    img.src = `images/history/img${slideNumber}.jpg`
    // img.alt = `Image ${slideNumber}`
    img.alt = `主图 ${slideNumber}`

    wrapper.appendChild(img)

    if (direction === 'down') {
      wrapper.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
    } else {
      wrapper.style.clipPath =
        'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
    }

    return wrapper
  }

  function createTextElement(slideNumber, direction) {
    const newTitle = document.createElement('h1')
    newTitle.textContent = slideTitles[slideNumber - 1]
    gsap.set(newTitle, {
      y: direction === 'down' ? 50 : -50,
    })

    const newDescription = document.createElement('p')
    newDescription.textContent = slideDescriptions[slideNumber - 1]
    gsap.set(newDescription, {
      y: direction === 'down' ? 20 : -20,
    })

    const newCounter = document.createElement('p')
    newCounter.textContent = slideNumber
    gsap.set(newCounter, {
      y: direction === 'down' ? 18 : -18,
    })

    return { newTitle, newDescription, newCounter }
  }

  function animateSlide(direction) {
    if (isAnimating || !controlsAllowed) return

    isAnimating = true
    controlsAllowed = false

    const slider = document.querySelector('.slider')
    const currentSlideElement = slider.querySelector('.slide')
    const mainImageContainer = document.querySelector('.slide-main-img')
    const currentMainWrapper = mainImageContainer.querySelector(
      '.slide-main-img-wrapper'
    )

    const titleContainer = document.querySelector('.slide-title')
    const descriptionContainer = document.querySelector('.slide-description')

    const currentTitle = titleContainer.querySelector('h1')
    const currentDescription = descriptionContainer.querySelector('p')

    if (direction === 'down') {
      currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1
    } else {
      currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1
    }

    const newSlide = createSlide(currentSlide, direction)
    const newMainWrapper = createMainImageWrapper(currentSlide, direction)
    const { newTitle, newDescription } = createTextElement(
      currentSlide,
      direction
    )

    slider.appendChild(newSlide)
    mainImageContainer.appendChild(newMainWrapper)
    titleContainer.appendChild(newTitle)
    descriptionContainer.appendChild(newDescription)

    gsap.set(newMainWrapper.querySelector('img'), {
      y: direction === 'down' ? '-50%' : '50%',
    })

    const tl = gsap.timeline({
      onComplete: () => {
        [
          currentSlideElement,
          currentMainWrapper,
          currentTitle,
          currentDescription,
        ].forEach((el) => el?.remove())

        isAnimating = false
        setTimeout(() => {
          controlsAllowed = true
          lastScrollTime = Date.now()
        }, 100)
      }
    })

    tl.to(
      newSlide.querySelector('.slide-bg-img'),
      {
        clipPath:
          direction === 'down'
            ? 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)'
            : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.25,
        ease: CustomEase.create('', '.87,0,.13,1')
      },
      0
    )
      .to(
        // currentSlideElement.querySelector('img'),
        currentSlideElement.querySelector('.bg-image'),
        {
          scale: 1.5,
          duration: 1.25,
          ease: CustomEase.create('', '.87,0,.13,1')
        },
        0
      )
      .to(
        newMainWrapper,
        {
          clipPath:
            direction === 'down'
              ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
              : 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
          duration: 1.25,
          ease: CustomEase.create('', '.87,0,.13,1')
        },
        0
      )
      .to(
        // currentMainWrapper.querySelector('img'),
        currentMainWrapper.querySelector('.main-image'),
        {
          y: direction === 'down' ? '50%' : '-50%',
          duration: 1.25,
          ease: CustomEase.create('', '.87,0,.13,1')
        },
        0
      )
      .to(
        // newMainWrapper.querySelector('img'),
        newMainWrapper.querySelector('.main-image'),
        {
          y: '0%',
          duration: 1.25,
          ease: CustomEase.create('', '.87,0,.13,1')
        },
        0
      )
      .to(
        currentTitle,
        {
          y: direction === 'down' ? -50 : 50,
          duration: 1.25,
          ease: CustomEase.create('', '.87,0,.13,1')
        },
        0
      )
      .to(
        newTitle,
        {
          y: 0,
          duration: 1.25,
          ease: CustomEase.create('', '.87,0,.13,1')
        },
        0
      )
      .to(
        currentDescription,
        {
          y: direction === 'down' ? -20 : 20,
          duration: 1.25,
          ease: CustomEase.create('', '.87,0,.13,1')
        },
        0
      )
      .to(
        newDescription,
        {
          y: 0,
          duration: 1.25,
          ease: CustomEase.create('', '.87,0,.13,1')
        },
        0
      )
  }

  // 添加按钮事件监听
  document.querySelector('.prev-btn').addEventListener('click', () => {
    handleScroll('up')
  })

  document.querySelector('.next-btn').addEventListener('click', () => {
    handleScroll('down')
  })

  function handleScroll(direction) {
    const now = Date.now()
    if (isAnimating || !controlsAllowed) return
    if (now - lastScrollTime < 1000) return
    lastScrollTime = now
    animateSlide(direction)
  }


})