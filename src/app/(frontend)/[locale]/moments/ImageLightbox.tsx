'use client'
import {
  Lightbox,
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
  RenderSlideProps,
  SlideImage,
  SlideVideo,
} from 'yet-another-react-lightbox'
import { Video, Thumbnails, Counter, Captions } from 'yet-another-react-lightbox/plugins'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import 'yet-another-react-lightbox/plugins/captions.css'

import { Media } from '@/components/Media'

type CustomSlide = (SlideImage | SlideVideo) & {
  key?: string
  src: string
  width?: number
  height?: number
  alt?: string
}

interface ImageLightboxProps {
  slides: CustomSlide[]
  index: number
  open: boolean
  close: () => void
}

function isNextJsImage(
  slide: CustomSlide,
): slide is Required<Pick<CustomSlide, 'width' | 'height'>> & CustomSlide {
  return isImageSlide(slide) && typeof slide.width === 'number' && typeof slide.height === 'number'
}

function NextJsImage({ slide, offset, rect }: RenderSlideProps<CustomSlide>) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps()
  const { currentIndex } = useLightboxState()

  if (!isNextJsImage(slide)) return undefined

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit)
  const width = !cover
    ? Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width))
    : rect.width
  const height = !cover
    ? Math.round(Math.min(rect.height, (rect.width / slide.width) * slide.height))
    : rect.height

  return (
    <div style={{ position: 'relative', width, height }}>
      <Media
        fill
        alt={slide.alt}
        src={slide}
        onClick={offset === 0 ? () => click?.({ index: currentIndex }) : undefined}
      />
    </div>
  )
}

export default function ImageLightbox({ slides, index, open, close }: ImageLightboxProps) {
  return (
    <Lightbox
      index={index}
      plugins={[Video, Thumbnails, Counter, Captions]}
      slides={slides}
      open={open}
      close={close}
      render={{ slide: NextJsImage }}
      controller={{
        closeOnBackdropClick: true,
      }}
      thumbnails={{
        border: 2,
        borderRadius: 2,
        padding: 0,
      }}
      captions={{
        showToggle: true,
      }}
      counter={{ container: { style: { top: 'unset', left: 'unset', bottom: 0, right: 0 } } }}
    />
  )
}
