let horizontal = document.getElementById("Custom_Gallery");
    horizontal.addEventListener("wheel", (e) => {
        e.preventDefault();
        horizontal.scrollLeft += e.deltaY * 2;
    })
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const deletor = new AbortController();
    const imgs = document.getElementsByClassName("clickableimage")
    const frame = document.getElementById("imageFrame")
    const events = ['click', 'keydown']
    const closeButtton = document.getElementById("close-framed-img-btn")
    const BG = document.getElementById("BG")
    let ratio = "empty"

    function handler() {}

    function handler2() {}
    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i];
        if (img == undefined) {
            continue;
        }
        closeButtton.hidden = true
        img.addEventListener('click', () => {
            document.body.inert = true
            const rect = img.getBoundingClientRect()
            const copy = img.cloneNode(true)
            // Opening animation setup
            document.documentElement.style.setProperty('--start-x', `${rect.left}px`);
            document.documentElement.style.setProperty('--start-y', `${rect.top}px`);
            document.documentElement.style.setProperty('--startWidth', `${rect.width}`)
            document.documentElement.style.setProperty('--startHeight', `${rect.height}`)
            copy.height = rect.height
            copy.width = rect.width
            copy.style.position = 'fixed';
            copy.style.top = `${rect.top}px`;
            copy.style.left = `${rect.left}px`;
            copy.id = "framed"
            // Opening animation ratio
            if (copy.height > copy.width) {
                ratio = "DetailsP"
            } else {
                ratio = "DetailsL"
            }
            // Play opening animation
            frame.appendChild(copy)
            BG.classList.remove("DetailsBg")
            BG.classList.remove("Exit")
            BG.classList.add("DetailsBg")
            copy.classList.remove(ratio)
            void img.offsetWidth;
            copy.classList.add(ratio)
            copy.addEventListener('animationend', () => {
                console.log("occur")
                document.body.inert = false
                closeButtton.hidden = false
                document.getElementsByClassName("clickable image").inert = true
                document.getElementsByClassName("scroll-container").inert = true
                const rect2 = copy.getBoundingClientRect()
                document.documentElement.style.setProperty('--end-x', `${rect2.left}px`);
                document.documentElement.style.setProperty('--end-y', `${rect2.top}px`);
                document.documentElement.style.setProperty('--endWidth', `${rect2.width}`)
                document.documentElement.style.setProperty('--endHeight', `${rect2.height}`)
                closeButtton.addEventListener('click', () => {
                    document.body.inert = true
                    closeButtton.hidden = true
                    BG.classList.remove("Exit")
                    void BG.offsetWidth;
                    BG.classList.add("Exit")
                    copy.classList.remove(ratio)
                    void img.offsetWidth;
                    copy.classList.add("ExitDetails")
                    copy.addEventListener('animationend', () => {
                        copy.remove();
                        document.getElementsByClassName("scroll-container").inert = false
                        document.getElementsByClassName("clickable image").inert = false
                        document.body.inert = false
                    });
                }, {
                    once: true
                })
                events.forEach(eventType => {
                    document.addEventListener(eventType, handleActivity => {
                        events.forEach(eventType => {
                            if (event.key === 'Escape' || event.type == 'click') {
                                closeButtton.hidden = true
                                document.body.inert = true
                                BG.classList.remove("Exit")
                                void BG.offsetWidth;
                                BG.classList.add("Exit")
                                copy.classList.remove(ratio)
                                copy.classList.add("ExitDetails")
                                copy.addEventListener('animationend', () => {
                                    copy.remove();
                                    document.getElementsByClassName("scroll-container").inert = false
                                    document.getElementsByClassName("clickable image").inert = false
                                    document.body.inert = false
                                }, {
                                    once: true
                                });
                            }
                        })
                    }, {
                        once: true
                    })
                })
            }, {
                once: true
            })
        })
    }