const viewTransition = (transitionFunction: () => void, onFinished?: () => void) => {
    // check if view transition is supported
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
        transitionFunction();
    } else {
        const transition = document.startViewTransition(() => {
            transitionFunction()
            if(onFinished)transition.finished.finally(onFinished);
        });
        
    }
};

export default viewTransition