const AlertModal = {
    modal : null,
    show(title, message){
        if(!this.modal){ // if modal is falsy, it runs the code, if not then skip creating the modal part and just show the modal
            this.modal = document.createElement('div');
            this.modal.className = 'w-full h-screen top-0 left-0 fixed z-50 bg-black/75 justify-center items-center modal modal-container-open';
            this.modal.style.display = 'none';
            this.modal.addEventListener('click', (e) => {
                if(e.target.classList.contains('modal')){
                    this.hide();
                }
            });

            document.body.appendChild(this.modal);
        }
        this.modal.innerHTML = 
            `<div class="bg-white w-5/12 rounded-md text-center p-5 font-fun modal-open">
                <h1 class="text-red-600 text-4xl mb-6">${title}</h1>
                <p class="text-red-500 text-2xl">${message}</p>
            </div>`;
        this.modal.style.display = 'flex';
    },
    hide(){
        if(this.modal){
            this.modal.style.display = 'none';
        }
    }
};

export default AlertModal;