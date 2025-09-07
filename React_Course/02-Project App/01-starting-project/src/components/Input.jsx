export default function Input({label, textarea,...props}, ref) {
    const inputClasses = "w-full p-2 bg-stone-200 border-b-2 text-stone-600 rounded-sm border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-600"
    return (
        <p className="flex flex-col gap-1 mb-4">
            <label className="block mb-2 text-sm font-bold text-stone-600">{label}</label>
            {textarea ? (
                <textarea
                    ref={ref}
                    className={inputClasses}
                    {...props}
                />
            ) : (
                <input
                    ref={ref}
                    type="text"
                    className={inputClasses}
                    {...props}
                />
            )}
        </p>
    );
}