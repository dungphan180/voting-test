// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Voting is Ownable {
    IERC20 public token;

    uint256 public maxRequireVoters;
    uint256 public totalBalances;
    uint256 public voteId;
    uint256 public test;

    struct Voter {
        uint256 balances;
        uint256 timeVote;
        bool answer; // true/false
    }

    struct VoteSubject {
        string title;
        uint256 totalVoters;
        address[] voters;
    }

    mapping(uint256 => VoteSubject) public voteSubjects;

    mapping(uint256 => mapping(address => Voter)) public voted;

    event CreateVoteSubject(string voteTitle);
    event Vote(address voter, uint256 voteId, bool answer, uint256 amount);

    constructor(IERC20 _token) {
        token = _token;
        maxRequireVoters = 2; //maximum 2 voters
    }

    modifier canVote(uint256 _voteId, uint256 _amount) {
        require(_voteId >= 0 && _voteId <= voteId, "Not Vote Subject");

        // require(voted[_voteId][msg.sender].balances >0, "You have voted");

        require(
            _amount <= token.balanceOf(msg.sender) && _amount > 0,
            "Invalid amount"
        );
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Check the token allowance");
        _;
    }

    function createVoteSubject(string memory voteTitle) public onlyOwner {
        VoteSubject storage curVoteSubject = voteSubjects[voteId];
        curVoteSubject.title = voteTitle;
        voteId++;
        emit CreateVoteSubject(voteTitle);
    }

    modifier canFund(uint256 _voteId) {
        VoteSubject storage curVoteSubject = voteSubjects[_voteId];
        address[] storage voters = voteSubjects[_voteId].voters;
        if (curVoteSubject.totalVoters >= 2) {
            autoRefun(_voteId);
        }
        _;
    }

    function vote(
        uint256 _voteId,
        bool _answer,
        uint256 _amount
    ) external canVote(_voteId, _amount) canFund(_voteId) {
        token.transferFrom(msg.sender, address(this), _amount);
        totalBalances += _amount;

        //add voted data
        voted[_voteId][msg.sender].balances += _amount;
        voted[_voteId][msg.sender].timeVote = block.timestamp;
        voted[_voteId][msg.sender].answer = _answer;

        //update number voters
        VoteSubject storage curVoteSubject = voteSubjects[_voteId];
        curVoteSubject.voters.push(msg.sender);
        curVoteSubject.totalVoters += 1;

        emit Vote(msg.sender, _voteId, _answer, _amount);
    }

    function autoRefun(uint256 _voteId) internal {
        uint256 length = voteSubjects[_voteId].voters.length;

        for (uint256 i = 0; i < length; i++) {
            address voter = voteSubjects[_voteId].voters[i];
            token.transfer(voter, voted[_voteId][voter].balances);
        }
    }

    function getTotalUserVote(uint256 _voteId)
        public
        view
        returns (address[] memory)
    {
        return voteSubjects[_voteId].voters;
    }
}
