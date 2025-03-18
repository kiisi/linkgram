import { X } from "lucide-react";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NewChatDialogProps {
    isOpen: boolean;
    onClose?: () => void;
    onCreate?: () => void;
    children?: ReactNode;
}
export default function NewChatDialog({ isOpen, onClose, children }: NewChatDialogProps) {

    return (
        <AnimatePresence>
            {
                isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.75 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed z-[99] inset-0 bg-black data-[state=open]:animate-overlay-show"
                            onClick={onClose}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed z-[100] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-transparent h-max w-full max-w-[425px] rounded-[12px] bg-white p-[16px] shadow-xl focus:outline-none"
                        >
                            <button onClick={onClose} className="absolute right-[14px] top-[14px] cursor-pointer">
                                <X className="text-[#65686c] hover:text-primary" />
                            </button>
                            { children }
                        </motion.div>
                    </>
                )
            }
        </AnimatePresence >
    )
}