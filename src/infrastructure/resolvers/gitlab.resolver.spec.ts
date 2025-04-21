import "reflect-metadata";
import "jest";
import { injectable } from "tsyringe";
import { GitLabIssueResolver } from './gitlab.resolver';

describe('GitlabResolver', () => {
    it("GitLab resolver should have function getGitLabProjectsList",()=>{
        const mockGitLabIssueService = {} as any;
        const gitlabResolver = new GitLabIssueResolver(mockGitLabIssueService);
        expect(typeof gitlabResolver.getGitLabProjectsList).toBe("function");
    })

    it("Function getGitLabProjectsList should call gitLabIssueService.getGitLabProjectsList",async()=>{
        const mockGitLabIssueService = {
            getGitLabProjectsList: jest.fn()
        } as any; 
        const gitlabResolver = new GitLabIssueResolver(mockGitLabIssueService);
        const number_of_projects = 5;
        const context = { userId: 1 };
        await gitlabResolver.getGitLabProjectsList(number_of_projects, context);
        expect(mockGitLabIssueService.getGitLabProjectsList).toHaveBeenCalledWith(number_of_projects, context.userId);
    });

    it("GitLab resolver should have function getGitLabProjectIssues",()=>{
        const mockGitLabIssueService = {} as any;
        const gitlabResolver = new GitLabIssueResolver(mockGitLabIssueService);
        expect(typeof gitlabResolver.getGitLabProjectIssues).toBe("function");
    });

    it("Function getGitLabProjectIssues should call gitLabIssueService.getGitLabProjectIssues",async()=>{
        const mockGitLabIssueService = {
            getGitLabProjectIssues: jest.fn()
        } as any; 
        const gitlabResolver = new GitLabIssueResolver(mockGitLabIssueService);
        const projectId = "1";
        const context = { userId: 1 };
        await gitlabResolver.getGitLabProjectIssues(projectId, context);
        expect(mockGitLabIssueService.getGitLabProjectIssues).toHaveBeenCalledWith(projectId, context.userId);
    });

    

})