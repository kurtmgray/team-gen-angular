import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newMemberName = '';
  members: string[] = [];
  teams: string[][] = [];
  numOfTeams: '' | number = '';
  errorMessage = '';

  addMember() {
    if (this.newMemberName === '') {
      this.errorMessage = 'Name cannot be empty.';
      return;
    }
    this.errorMessage = '';
    this.members.push(this.newMemberName);
    this.newMemberName = '';
    console.log(this.members);
  }

  onInput(member: string) {
    this.newMemberName = member;
  }

  onTeamSizeInput(value: string) {
    this.numOfTeams = Number(value);
  }

  generateTeams() {
    this.teams = [];
    const allMembers = [...this.members];
    if (typeof this.numOfTeams === 'number') {
      if (this.members.length < this.numOfTeams) {
        this.errorMessage = 'Not enough members';
        return;
      }

      this.errorMessage = '';

      while (allMembers.length) {
        for (let i = 0; i < this.numOfTeams; i++) {
          const randomIndex = Math.floor(Math.random() * allMembers.length);
          const member = allMembers.splice(randomIndex, 1)[0];
          if (this.teams[i]) {
            this.teams[i].push(member);
          } else {
            this.teams[i] = [member];
          }
        }
      }
    } else {
      this.errorMessage = 'Must have at least 1 team.';
      return;
    }

    this.members = [];
    this.numOfTeams = '';
  }
}
