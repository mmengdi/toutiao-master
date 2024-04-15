// vSlideIn.js
/* const DISTANCE = 150;
const DURATION = 1000;
const animationMap = new WeakMap()
const ob = new IntersectionObserver(entries => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            console.log(entry);
            const animation = animationMap.get(entry.target);
            animation.play();
            ob.unobserve(entry.target);
        }
    }
})
function isBelowViewport(el) {
    const rect = el.getBoundingClientRect()
    return rect.top > window.innerHeight;
}
export default {
    mounted(el) {
        if (!isBelowViewport(el)) {
            return;
        }
        const animation = el.animate([
            {
                transform: `translateY(${DISTANCE}px)`,
                opacity: 0.5
            },
            {
                transform: 'translateY(0)',
                opacity: 1
            }
        ], {
            duration: DURATION,
            easing: 'ease'
        })
        animation.pause();
        animationMap.set(el, animation);
        ob.observe(el)
    },
    unmounted(el) {
        ob.unobserve(el)
    }
} */



// vSlideIn.ts

// 定义常量的类型
const DISTANCE: number = 150;
const DURATION: number = 1000;
const animationMap = new WeakMap()

// 使用 IntersectionObserver 的类型定义
const ob: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            // console.log(entry);
            const animation: Animation | undefined = animationMap.get(entry.target);
            if (animation) {
                animation.play();
                ob.unobserve(entry.target);
            }
        }
    }
});

// 定义函数 isBelowViewport 的类型
function isBelowViewport(el: HTMLElement): boolean {
    const rect: DOMRect = el.getBoundingClientRect();
    return rect.top > window.innerHeight;
}

// 导出的模块定义
const vSlideIn = {
    mounted(el: HTMLElement): void {
        if (!isBelowViewport(el)) {
            return;
        }
        const animation: Animation = el.animate([
            {
                transform: `translateY(${DISTANCE}px)`,
                opacity: 0.5
            },
            {
                transform: 'translateY(0)',
                opacity: 1
            }
        ], {
            duration: DURATION,
            easing: 'ease'
        });
        animation.pause();
        animationMap.set(el, animation);
        ob.observe(el);
    },
    unmounted(el: HTMLElement): void {
        ob.unobserve(el);
    }
};

export default vSlideIn;
