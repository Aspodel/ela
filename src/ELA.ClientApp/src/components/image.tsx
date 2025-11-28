import React from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from "@/lib/utils"
import { fadeIn, scaleFade } from '@/config/motion-variants';

type ImageProps = {
    src: string;
    alt?: string;
    fallback?: string;
    className?: string;
}

export const Image = ({ src, alt = 'image', fallback = '', className }: ImageProps) => {
    const [currentSrc, setCurrentSrc] = React.useState(src)
    const [loaded, setLoaded] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    const handleLoad = () => setLoaded(true);
    const handleError = () => fallback && currentSrc !== fallback && setCurrentSrc(fallback);
    const handleOpen = () => loaded && setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <motion.img
                src={currentSrc}
                alt={alt}
                className={cn(
                    "object-cover cursor-pointer",
                    className
                )}
                onLoad={handleLoad}
                onError={handleError}
                onClick={handleOpen}
                initial="hidden"
                animate={loaded ? "visible" : "hidden"}
                variants={fadeIn}
            />

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.img
                            src={currentSrc}
                            alt={alt}
                            className={cn(
                                "object-contain max-h-[90vh] max-w-[90vw] cursor-default",
                                className
                            )}
                            onClick={(e) => e.stopPropagation()}
                            variants={scaleFade}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        />
                    </motion.div>
                )}
            </AnimatePresence >
        </>
    );
};
