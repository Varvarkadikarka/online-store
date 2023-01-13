abstract class ComponentHF {
  protected wrapper: HTMLElement;

  constructor() {
    this.wrapper = document.querySelector('.wrapper') as HTMLElement;
  }
}

export default ComponentHF;
